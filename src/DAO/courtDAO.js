const { updateEntity } = require(".");
const { CustomApplicationError } = require("../exception/Error");

const findAllCourts = async ({ strapi }) => {
  return await strapi.entityService
    .findMany("api::court.court", {
      sort: { createdAt: "DESC" },
      populate: { bookings: true },
    })
    .catch((error) => {
      throw new CustomApplicationError({
        message: "There is something wrong",
        serviceName: "findAllCourts DAO",
        error: error,
      });
    });
};

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
  findAllCourts,
  updateCourtBookingSlots,
  updateCourtBookings,
};
