"use strict";

/**
 * bookingslot router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::bookingslot.bookingslot", {
  config: {
    find: { auth: false },
  },
});
