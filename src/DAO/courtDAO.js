const utils = require("@strapi/utils");
const { updateEntity } = require(".");
const { ApplicationError } = utils.errors;

const updateCourtBookingSlots = async ({ courtId, updatedData, strapi }) => {
  await strapi.entityService
    .update("api::court.court", courtId, {
      data: {
        bookingslots: updatedData,
      },
    })
    .catch((error) => {
      console.log("error in update court booking slots:\n", error);
      throw new ApplicationError("There is something wrong");
    });
};

const updateCourtBookings = async ({ bookings, strapi }) => {
  return await updateEntity({
    strapi,
    entityName: "court",
    updateData: bookings,
  });
};

module.exports = {
  updateCourtBookingSlots,
  updateCourtBookings,
};
