const {
  findBookingSlotsByCourtAndDate,
} = require("../../../DAO/bookingslotsDAO");

const isBetween = (startAt, endAt, array) => {
  const startIndex = bookingslots.indexOf(startAt);
  const endIndex = bookingslots.indexOf(endAt);

  return array.filter((index) => index <= startIndex && index >= endIndex);
};

async function validateBookingSection({
  startAt,
  endAt,
  date,
  courtId,
  strapi,
}) {
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
}

module.exports = { validateBookingSection };
