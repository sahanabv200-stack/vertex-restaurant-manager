function validateBody(requiredFields = []) {
  return (req, _res, next) => {
    const missing = requiredFields.filter((field) => {
      const value = req.body[field];
      return value === undefined || value === null || value === "";
    });

    if (missing.length > 0) {
      return next({
        statusCode: 400,
        message: `Missing required fields: ${missing.join(", ")}`,
      });
    }

    return next();
  };
}

module.exports = {
  validateBody,
};
