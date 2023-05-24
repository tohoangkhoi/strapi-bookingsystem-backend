"use strict";

const { updateCourtBookingSlots } = require("../../../DAO/courtDAO");
const {
  insertManyBookingSlots,
  findBookingSlotsByCourtAndDate,
} = require("../../../DAO/bookingslotsDAO");
const { findEntityByID } = require("../../../DAO");

/**
 * court service
 */

const { createCoreService } = require("@strapi/strapi").factories;
const timeslots = ["08:00", "08:30", "09:00", "09:30", "10:00"];

module.exports = createCoreService("api::court.court", ({ strapi }) => ({
  async findBookingSlotOnDate({ courtId, date }) {
    const court = await findEntityByID({
      entityName: "court",
      id: courtId,
      populate: { bookingslots: true },
      strapi,
    });

    const bookingSlots = await findBookingSlotsByCourtAndDate({
      courtId,
      date,
      strapi,
    });

    if (bookingSlots.length == 0) {
      // if the bookingslots on that date is empty, we generate a list of default timeslot
      const defaultTimeslotsOnDate = timeslots.map((item) => {
        return {
          date: date,
          time: item,
          isBooked: false,
          courtId: courtId,
        };
      });
      // ids here is the id of the last bookingslot entities which is inserted by the bulk operation

      const { ids: createdBookingSlotsIds } = await insertManyBookingSlots({
        strapi,
        insertData: defaultTimeslotsOnDate,
      });

      // if court's booking slots are empty by default, add the defaults booking slots to it
      // otherwise, update court's booking slot
      const combinedBookingSlots = court.bookingslots
        ? [...court.bookingslots, ...defaultTimeslotsOnDate]
        : [...defaultTimeslotsOnDate];

      await updateCourtBookingSlots({
        courtId,
        updatedData: createdBookingSlotsIds,
        strapi,
      });

      return combinedBookingSlots;
    }
    // if there are already timeslots on that date
    return bookingSlots;
  },
}));
