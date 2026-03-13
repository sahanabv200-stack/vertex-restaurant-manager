const CrudRepository = require("./crudRepository");
const entityConfigs = require("../models/entityConfigs");

module.exports = new CrudRepository(entityConfigs.users);

