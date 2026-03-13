module.exports = {
  async execute(handler, ...args) {
    return handler(...args);
  },
};
