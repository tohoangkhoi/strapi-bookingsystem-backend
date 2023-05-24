"use strict";

const { handleCreateBooking } = require("../services/bookingCustomService");

/**
 * booking controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::booking.booking", ({ strapi }) => ({
  async create(ctx) {
    // some custom logic here
    const { data: bookingInputData } = ctx.request.body;

    return await handleCreateBooking(bookingInputData);
  },
}));
