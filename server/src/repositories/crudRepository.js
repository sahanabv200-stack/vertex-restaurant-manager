const { query } = require("../config/db");

class CrudRepository {
  constructor(config) {
    this.config = config;
  }

  buildWhere({ search, filters = {} }) {
    const whereParts = [];
    const params = [];

    Object.entries(filters).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;
      if (!this.config.filterable.includes(key)) return;

      whereParts.push(`\`${key}\` = ?`);
      params.push(value);
    });

    if (search && this.config.searchable.length > 0) {
      const searchParts = this.config.searchable.map((col) => `\`${col}\` LIKE ?`);
      whereParts.push(`(${searchParts.join(" OR ")})`);
      this.config.searchable.forEach(() => params.push(`%${search}%`));
    }

    if (whereParts.length === 0) {
      return { clause: "", params };
    }

    return { clause: `WHERE ${whereParts.join(" AND ")}`, params };
  }

  async list({ page = 1, limit = 20, search = "", sortBy, sortOrder = "DESC", filters = {} }) {
    const safePage = Math.max(1, Number(page) || 1);
    const safeLimit = Math.min(100, Math.max(1, Number(limit) || 20));
    const offset = (safePage - 1) * safeLimit;

    const orderBy = this.config.sortable.includes(sortBy) ? sortBy : this.config.defaultSort;
    const order = String(sortOrder).toUpperCase() === "ASC" ? "ASC" : "DESC";

    const where = this.buildWhere({ search, filters });

    const sql = `
      SELECT *
      FROM \`${this.config.table}\`
      ${where.clause}
      ORDER BY \`${orderBy}\` ${order}
      LIMIT ? OFFSET ?`;

    const countSql = `SELECT COUNT(*) AS total FROM \`${this.config.table}\` ${where.clause}`;

    const rows = await query(sql, [...where.params, safeLimit, offset]);
    const countRows = await query(countSql, where.params);

    return {
      rows,
      total: countRows[0]?.total || 0,
      page: safePage,
      limit: safeLimit,
    };
  }

  async findById(id) {
    const rows = await query(`SELECT * FROM \`${this.config.table}\` WHERE id = ?`, [id]);
    return rows[0] || null;
  }

  async create(payload) {
    const keys = Object.keys(payload);
    const values = Object.values(payload);

    const columns = keys.map((key) => `\`${key}\``).join(", ");
    const placeholders = keys.map(() => "?").join(", ");

    const sql = `INSERT INTO \`${this.config.table}\` (${columns}) VALUES (${placeholders})`;
    const result = await query(sql, values);
    return this.findById(result.insertId);
  }

  async update(id, payload) {
    const keys = Object.keys(payload);
    const values = Object.values(payload);
    const assignment = keys.map((key) => `\`${key}\` = ?`).join(", ");

    const sql = `UPDATE \`${this.config.table}\` SET ${assignment} WHERE id = ?`;
    await query(sql, [...values, id]);
    return this.findById(id);
  }

  async remove(id) {
    const result = await query(`DELETE FROM \`${this.config.table}\` WHERE id = ?`, [id]);
    return result.affectedRows > 0;
  }
}

module.exports = CrudRepository;

