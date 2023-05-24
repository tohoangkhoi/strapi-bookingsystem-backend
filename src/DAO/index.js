const utils = require("@strapi/utils");
const { CustomApplicationError } = require("../exception/Error");
const { ApplicationError, NotFoundError } = utils.errors;

const insertEntity = async ({ strapi, entityName, insertData }) => {
  return await strapi.entityService
    .create(`api::${entityName}.${entityName}`, {
      data: insertData,
    })
    .catch((err) => {
      throw new CustomApplicationError({
        message: "There is something wrong.",
        serviceName: "Error in insertEntity DAO",
        error: err,
      });
    });
};

const updateEntity = async ({ strapi, entityName, updateData }) => {
  return await strapi.entityService
    .update(`api::${entityName}.${entityName}`, {
      data: { updateData },
    })
    .catch((err) => {
      throw new CustomApplicationError({
        message: "There is something wrong.",
        serviceName: "Error in updateEntity DAO",
        error: err,
      });
    });
};

const findEntityByID = async ({ id, populate, strapi, entityName }) => {
  const result = await strapi.entityService
    .findOne(`api::${entityName}.${entityName}`, id, {
      populate: populate,
    })
    .catch((err) => {
      throw new CustomApplicationError({
        message: "There is something wrong.",
        serviceName: "Error in findEntityByID DAO",
        error: err,
      });
    });

  // need to test if this code is reachable
  if (!result) {
    throw new NotFoundError(`Cannot find ${entityName} ${id}.`);
  }
  return result;
};

const getEntityRelations = async ({ id, relation, strapi, entityName }) => {
  const entity = await findEntityByID({
    id,
    populate: relation,
    strapi,
    entityName,
  });

  return entity[`${relation}`];
};

module.exports = {
  insertEntity,
  findEntityByID,
  getEntityRelations,
  updateEntity,
};
