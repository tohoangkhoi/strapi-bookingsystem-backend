"use strict";

const { findAllBookingSlots } = require("../../../DAO/bookingslotsDAO");

/**
 * bookingslot controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::bookingslot.bookingslot",
  ({ strapi }) => ({
    async find(ctx) {
      const queryParams = ctx.query;

      if (queryParams.courtId && queryParams.date) {
        const { courtId, date } = queryParams;

        return await strapi.service("api::court.court").findBookingSlotOnDate({
          courtId: parseInt(courtId),
          date: date,
        });
      }

      return await findAllBookingSlots({ strapi });
    },
  })
);
