function logger(message, meta = {}) {
  const now = new Date().toISOString();
  if (Object.keys(meta).length === 0) {
    console.log(`[${now}] ${message}`);
    return;
  }
  console.log(`[${now}] ${message}`, meta);
}

module.exports = logger;
