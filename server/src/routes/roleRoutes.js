const { buildCrudRouter } = require("./createCrudRouter");

module.exports = buildCrudRouter("roles", {
  writeRoles: ["owner"],
  deleteRoles: ["owner"],
});
