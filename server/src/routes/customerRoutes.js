const { buildCrudRouter } = require("./createCrudRouter");

module.exports = buildCrudRouter("customers", {
  writeRoles: ["owner", "manager", "cashier", "waiter", "captain"],
  deleteRoles: ["owner", "manager"],
});
