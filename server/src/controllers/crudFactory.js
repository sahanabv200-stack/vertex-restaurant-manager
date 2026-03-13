const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const CrudService = require("../services/crudService");
const entityConfigs = require("../models/entityConfigs");

function createEntityController(entityKey) {
  const config = entityConfigs[entityKey];
  if (!config) {
    throw new ApiError(500, `Unknown entity: ${entityKey}`);
  }

  const service = new CrudService(config);

  return {
    list: asyncHandler(async (req, res) => {
      const { page, limit, q, sortBy, sortOrder, ...filters } = req.query;
      const result = await service.list({
        page,
        limit,
        search: q || "",
        sortBy,
        sortOrder,
        filters,
      });

      res.json(new ApiResponse(`${config.label} list fetched`, result.data, result.pagination));
    }),

    getById: asyncHandler(async (req, res) => {
      const record = await service.getById(req.params.id);
      res.json(new ApiResponse(`${config.label} fetched`, record));
    }),

    create: asyncHandler(async (req, res) => {
      const record = await service.create(req.body);
      res.status(201).json(new ApiResponse(`${config.label} created`, record));
    }),

    update: asyncHandler(async (req, res) => {
      const record = await service.update(req.params.id, req.body);
      res.json(new ApiResponse(`${config.label} updated`, record));
    }),

    remove: asyncHandler(async (req, res) => {
      await service.remove(req.params.id);
      res.json(new ApiResponse(`${config.label} deleted`));
    }),
  };
}

module.exports = {
  createEntityController,
};
