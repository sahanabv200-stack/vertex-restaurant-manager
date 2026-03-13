const { buildCrudRouter } = require("./createCrudRouter");

module.exports = buildCrudRouter("users", {
  writeRoles: ["owner", "manager"],
  deleteRoles: ["owner"],
});
