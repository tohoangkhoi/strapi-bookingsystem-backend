"use strict";

/**
 * bookingslot service
 */

const utils = require("@strapi/utils");
const { ApplicationError } = utils.errors;
const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::bookingslot.bookingslot");
