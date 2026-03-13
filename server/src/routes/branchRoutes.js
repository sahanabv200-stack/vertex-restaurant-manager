const { buildCrudRouter } = require("./createCrudRouter");

module.exports = buildCrudRouter("branches", {
  writeRoles: ["owner", "manager"],
  deleteRoles: ["owner"],
});
