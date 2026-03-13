const { buildCrudRouter } = require("./createCrudRouter");

module.exports = buildCrudRouter("menuItems", {
  writeRoles: ["owner", "manager"],
  deleteRoles: ["owner", "manager"],
});
