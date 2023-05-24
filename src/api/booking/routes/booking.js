"use strict";

/**
 * booking router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::booking.booking", {
  config: {
    create: { auth: false },
    find: { auth: false },
  },
});
