"use strict";

/**
 * court controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::court.court", ({ strapi }) => ({
  async find() {
    return await strapi.entityService.findMany("api::court.court", {
      sort: { createdAt: "DESC" },
      populate: { bookings: true },
    });
  },
}));
