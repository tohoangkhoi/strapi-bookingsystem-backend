const { findEntityByID } = require("../../../DAO");
const {
  findBookingSlotsByCourtAndDate,
} = require("../../../DAO/bookingslotsDAO");

const isBetween = (startAt, endAt, array) => {
  const startIndex = bookingslots.indexOf(startAt);
  const endIndex = bookingslots.indexOf(endAt);

  return array.filter((index) => index <= startIndex && index >= endIndex);
};

// create booking entity and attach it to correct court and player
const handleCreateBooking = async (input) => {
  const { courtId, playerId, start, end, date } = input;

  // find user that booked the session

  const user = await findEntityByID({
    entityName: "player",
    id: courtId,
    populate: { bookings: true },
    strapi,
  });

  const court = await findEntityByID({
    entityName: "court",
    id: courtId,
    populate: { bookings: true },
    strapi,
  });

  // validate if the selected booking sections are ready to be booked
  const validatedBookingSlotsIDs = await validateBookingSection({
    startAt: start,
    endAt: end,
    date: date,
    courtId: courtId,
    strapi,
  });

  //if ready to be booked
  if (validatedBookingSlotsIDs) {
    // update the validated booking slots status to "booked"
    const updateBookingSlotsQuery = {
      $and: [
        {
          // id needs to be inside the validatedBookingSlotsIDs
          id: {
            $in: validatedBookingSlotsIDs,
          },
        },
        {
          date: date,
        },
        {
          courtId: courtId,
        },
      ],
    };

    await updateManyBookingSlots({
      strapi,
      query: updateBookingSlotsQuery,
      updateData: { isBooked: true },
    });

    // create booking
    const insertBookingData = {
      start: start,
      end: end,
      playerId: playerId,
      courtId: courtId,
    };

    const createdBooking = await insertEntity({
      strapi,
      entityName: "booking",
      insertData: insertBookingData,
    });

    // connect createdbooking with player
    const combinedPlayerBookings = !!user.bookings
      ? [...user.bookings, createdBooking.id]
      : [createdBooking.id];

    await updatePlayerBookings({
      bookings: combinedPlayerBookings,
      strapi,
    });

    // connect createdbooking with court
    const combinedCourtBookings = !!court.bookings
      ? [...court.bookings, createdBooking.id]
      : [createdBooking.id];

    await updateCourtBookings({
      bookings: { combinedCourtBookings },
      strapi,
    });
  }
  return {
    message:
      "Some booking slots in this sections are not available, please select another sections",
  };
};

const validateBookingSection = async ({
  startAt,
  endAt,
  date,
  courtId,
  strapi,
}) => {
  // find timeslots on that date
  const bookingslots = await findBookingSlotsByCourtAndDate({
    courtId: courtId,
    date: date,
    strapi,
  });

  // startAt: (exp: "9:00") ; endAt: (exp: "10:30")
  //Ensure there is no "booked" section between startAt and endAt

  return isBetween(startAt, endAt, bookingslots)
    .find((item) => item.isBooked)
    .map((item) => item.id);
};

module.exports = { validateBookingSection, handleCreateBooking };
