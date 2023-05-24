const utils = require("@strapi/utils");
const { ApplicationError, NotFoundError } = utils.errors;

class CustomApplicationError extends ApplicationError {
  constructor({ message, serviceName, error }) {
    super(message);
    console.log(`There is error in ${serviceName}:\n`, error);
  }
}

module.exports = { CustomApplicationError };
