"use strict";

const { findAllBookingSlots } = require("../../../DAO/bookingslotsDAO");

/**
 * court controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::court.court", ({ strapi }) => ({
  async find() {
    return await findAllBookingSlots({ strapi });
  },
}));
