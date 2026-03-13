const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const { query } = require("../config/db");
const comparePassword = require("../utils/comparePassword");
const hashPassword = require("../utils/hashPassword");
const generateToken = require("../utils/generateToken");

const authController = {
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    const users = await query(
      `SELECT u.id, u.full_name, u.email, u.phone, u.password_hash, u.status, u.role_id, r.name AS role_name
       FROM users u
       INNER JOIN roles r ON r.id = u.role_id
       WHERE u.email = ? LIMIT 1`,
      [email]
    );

    const user = users[0];
    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    if (user.status !== "active") {
      throw new ApiError(403, "User account is inactive");
    }

    const isValid = await comparePassword(password, user.password_hash);
    if (!isValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    if (!String(user.password_hash).startsWith("$2")) {
      const newHash = await hashPassword(password);
      await query("UPDATE users SET password_hash = ? WHERE id = ?", [newHash, user.id]);
    }

    await query("UPDATE users SET last_login = NOW() WHERE id = ?", [user.id]);

    const token = generateToken({
      sub: user.id,
      email: user.email,
      role: user.role_name,
      roleId: user.role_id,
    });

    res.json(
      new ApiResponse("Login successful", {
        token,
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          phone: user.phone,
          role: user.role_name,
          role_id: user.role_id,
        },
      })
    );
  }),

  me: asyncHandler(async (req, res) => {
    const users = await query(
      `SELECT u.id, u.full_name, u.email, u.phone, u.status, u.role_id, r.name AS role_name
       FROM users u
       INNER JOIN roles r ON r.id = u.role_id
       WHERE u.id = ? LIMIT 1`,
      [req.user.id]
    );

    const user = users[0];
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    res.json(new ApiResponse("Profile fetched", user));
  }),

  register: asyncHandler(async (req, res) => {
    const { role_id, full_name, email, phone, password } = req.body;

    if (!role_id || !full_name || !email || !password) {
      throw new ApiError(400, "role_id, full_name, email and password are required");
    }

    const existing = await query("SELECT id FROM users WHERE email = ? LIMIT 1", [email]);
    if (existing.length > 0) {
      throw new ApiError(409, "Email already exists");
    }

    const passwordHash = await hashPassword(password);
    const result = await query(
      `INSERT INTO users (role_id, full_name, email, phone, password_hash, status)
       VALUES (?, ?, ?, ?, ?, 'active')`,
      [role_id, full_name, email, phone || null, passwordHash]
    );

    const created = await query(
      `SELECT id, role_id, full_name, email, phone, status FROM users WHERE id = ?`,
      [result.insertId]
    );

    res.status(201).json(new ApiResponse("User registered", created[0]));
  }),
};

module.exports = authController;
