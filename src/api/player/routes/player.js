"use strict";

/**
 * player router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::player.player", {
  config: {
    find: {
      auth: false,
    },
    create: {
      auth: false,
    },
  },
});
