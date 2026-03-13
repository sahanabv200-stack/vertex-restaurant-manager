const { buildCrudRouter } = require("./createCrudRouter");

module.exports = buildCrudRouter("tables", {
  writeRoles: ["owner", "manager", "waiter", "captain"],
  deleteRoles: ["owner", "manager"],
});
