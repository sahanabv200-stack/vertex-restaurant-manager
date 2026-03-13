const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const jwtConfig = require("../config/jwt");

function authenticate(req, _res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return next(new ApiError(401, "Authentication token is required"));
  }

  try {
    const payload = jwt.verify(token, jwtConfig.secret);
    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      roleId: payload.roleId,
    };
    return next();
  } catch (_error) {
    return next(new ApiError(401, "Invalid or expired token"));
  }
}

module.exports = {
  authenticate,
};
