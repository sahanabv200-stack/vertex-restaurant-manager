const { buildCrudRouter } = require("./createCrudRouter");

module.exports = buildCrudRouter("menuCategories", {
  writeRoles: ["owner", "manager"],
  deleteRoles: ["owner", "manager"],
});
