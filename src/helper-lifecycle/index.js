const callInBeforeCreate = (event) => {
  console.log("beforeCreate \n", { event });
  console.log("param", event.params);
  console.log("attributes \n", event.model.attributes);
};

module.exports = { callInBeforeCreate };
