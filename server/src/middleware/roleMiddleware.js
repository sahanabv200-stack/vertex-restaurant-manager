const ApiError = require("../utils/ApiError");

function authorize(...allowedRoles) {
  return (req, _res, next) => {
    if (!req.user) {
      return next(new ApiError(401, "Unauthenticated request"));
    }
    if (allowedRoles.length === 0) {
      return next();
    }

    const userRole = (req.user.role || "").toLowerCase();
    const normalized = allowedRoles.map((role) => role.toLowerCase());

    if (!normalized.includes(userRole)) {
      return next(new ApiError(403, "You do not have permission for this action"));
    }

    return next();
  };
}

module.exports = {
  authorize,
};
