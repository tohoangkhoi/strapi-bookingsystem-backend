const { CustomApplicationError } = require("../exception/Error");

const findAllBookingSlots = async ({ strapi }) => {
  return await strapi.entityService
    .findMany("api::bookingslot.bookingslot")
    .catch((error) => {
      throw new CustomApplicationError({
        message: "There is something wrong",
        serviceName: "getAllBookingSlots",
        error: error,
      });
    });
};
const findBookingSlotsByCourtAndDate = async ({ courtId, date, strapi }) => {
  return await strapi.entityService
    .findMany("api::bookingslot.bookingslot", {
      filters: { courtId: courtId, date: date },
    })
    .catch((err) => {
      throw new CustomApplicationError({
        message: "There is something wrong",
        serviceName: "findBookingSlotsByCourtAndDate DAO",
        error: err,
      });
    });
};

const insertManyBookingSlots = async ({ strapi, insertData }) => {
  return await strapi.db
    .query("api::bookingslot.bookingslot")
    .createMany({
      data: insertData,
    })
    .catch((err) => {
      throw new CustomApplicationError({
        message: "There is something wrong",
        serviceName: "insertManyBookingSlots DAO",
        error: err,
      });
    });
};

const updateManyBookingSlots = async ({ strapi, query, updateData }) => {
  return await strapi.db
    .query("api::bookingslot.bookingslot")
    .updateMany({
      where: query,
      data: updateData,
    })
    .catch((err) => {
      throw new CustomApplicationError({
        message: "There is something wrong",
        serviceName: "updateManyBookingSlots DAO",
        error: err,
      });
    });
};

module.exports = {
  findAllBookingSlots,
  findBookingSlotsByCourtAndDate,
  insertManyBookingSlots,
  updateManyBookingSlots,
};
