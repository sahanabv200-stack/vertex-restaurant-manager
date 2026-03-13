function hasRequired(body, fields = []) {
  return fields.every((field) => body[field] !== undefined && body[field] !== null && body[field] !== "");
}

module.exports = {
  hasRequired,
};
