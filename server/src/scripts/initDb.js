const fs = require("fs/promises");
const path = require("path");

let dotenvLoaded = false;
try {
  // Optional dependency; script still works if env vars are already exported.
  require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
  dotenvLoaded = true;
} catch (error) {
  dotenvLoaded = false;
}

const mysql = require("mysql2/promise");

function resolveSqlPath(fileName) {
  const preferred = path.resolve(__dirname, "../../sql", fileName);
  const fallback = path.resolve(__dirname, "../database", fileName);
  return fs
    .access(preferred)
    .then(() => preferred)
    .catch(async () => {
      await fs.access(fallback);
      return fallback;
    });
}

async function readSql(fileName) {
  const fullPath = await resolveSqlPath(fileName);
  const content = await fs.readFile(fullPath, "utf8");
  return { fullPath, content };
}

async function run() {
  const shouldSeed = process.argv.includes("--with-seed");
  const host = process.env.DB_HOST || "127.0.0.1";
  const port = Number(process.env.DB_PORT || 3306);
  const user = process.env.DB_USER || "root";
  const password = process.env.DB_PASSWORD || "";

  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
    multipleStatements: true,
  });

  try {
    const schema = await readSql("schema.sql");
    await connection.query(schema.content);
    console.log(`Applied schema: ${schema.fullPath}`);

    if (shouldSeed) {
      const seed = await readSql("seed.sql");
      await connection.query(seed.content);
      console.log(`Applied seed: ${seed.fullPath}`);
    }

    console.log("Database initialization completed.");
  } finally {
    await connection.end();
  }
}

run().catch((error) => {
  console.error("Database initialization failed.");
  if (!dotenvLoaded) {
    console.error("Note: dotenv is not installed, using current process env.");
  }
  console.error(error.message);
  process.exit(1);
});

