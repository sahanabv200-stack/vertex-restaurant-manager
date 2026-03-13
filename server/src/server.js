const app = require("./app");
const env = require("./config/env");
const { query } = require("./config/db");
const logger = require("./utils/logger");

async function bootstrap() {
  try {
    await query("SELECT 1");
    logger("Database connection successful");

    app.listen(env.port, () => {
      logger(`Server started on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error.message);
    process.exit(1);
  }
}

bootstrap();
