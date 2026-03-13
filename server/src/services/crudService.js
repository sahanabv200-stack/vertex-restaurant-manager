const ApiError = require("../utils/ApiError");
const CrudRepository = require("../repositories/crudRepository");

class CrudService {
  constructor(config) {
    this.config = config;
    this.repository = new CrudRepository(config);
  }

  sanitizePayload(payload) {
    const sanitized = {};
    this.config.writable.forEach((field) => {
      if (payload[field] !== undefined) {
        sanitized[field] = payload[field];
      }
    });
    return sanitized;
  }

  stripHidden(row) {
    if (!row) return row;
    const clone = { ...row };
    this.config.hidden.forEach((field) => delete clone[field]);
    return clone;
  }

  async list(params) {
    const result = await this.repository.list(params);
    return {
      data: result.rows.map((row) => this.stripHidden(row)),
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: Math.ceil(result.total / result.limit) || 1,
      },
    };
  }

  async getById(id) {
    const record = await this.repository.findById(id);
    if (!record) {
      throw new ApiError(404, `${this.config.label} not found`);
    }
    return this.stripHidden(record);
  }

  async create(payload) {
    const sanitized = this.sanitizePayload(payload);
    if (Object.keys(sanitized).length === 0) {
      throw new ApiError(400, "No valid fields provided");
    }

    const created = await this.repository.create(sanitized);
    return this.stripHidden(created);
  }

  async update(id, payload) {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new ApiError(404, `${this.config.label} not found`);
    }

    const sanitized = this.sanitizePayload(payload);
    if (Object.keys(sanitized).length === 0) {
      throw new ApiError(400, "No valid fields provided");
    }

    const updated = await this.repository.update(id, sanitized);
    return this.stripHidden(updated);
  }

  async remove(id) {
    const deleted = await this.repository.remove(id);
    if (!deleted) {
      throw new ApiError(404, `${this.config.label} not found`);
    }
    return true;
  }
}

module.exports = CrudService;
