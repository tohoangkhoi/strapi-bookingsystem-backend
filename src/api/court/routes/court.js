"use strict";

/**
 * court router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::court.court", {
  config: {
    create: { auth: false },
    find: { auth: false },
    update: { auth: false },
  },
});
