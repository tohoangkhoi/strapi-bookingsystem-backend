const { updateEntity } = require(".");

const updatePlayerBookings = async ({ strapi, bookings }) => {
  return await updateEntity({
    strapi,
    entityName: "player",
    updateData: bookings,
  });
};

module.exports = {
  updatePlayerBookings,
};
