const { buildCrudRouter } = require("./createCrudRouter");

module.exports = buildCrudRouter("vendors", {
  writeRoles: ["owner", "manager", "purchase_manager"],
  deleteRoles: ["owner", "manager"],
});
