"use strict";

/**
 * booking controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::booking.booking", ({ strapi }) => ({
  async create(ctx) {
    // some custom logic here
    const { data: bookingInputData } = ctx.request.body;

    return strapi
      .service("api::booking.booking")
      .handleCreateBooking(bookingInputData);
  },
}));
