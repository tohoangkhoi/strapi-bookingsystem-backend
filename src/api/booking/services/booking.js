"use strict";

const { findEntityByID, insertEntity } = require("../../../DAO");
const { updatePlayerBookings } = require("../../../DAO/playerDAO");

const { updateCourtBookings } = require("../../../DAO/courtDAO");
const { validateBookingSections } = require("./bookingCustomService");

/**
 * booking service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::booking.booking");
