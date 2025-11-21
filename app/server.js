const http = require("http");
const sql = require("mssql");

// Convert Azure connection string → to config object
function buildSqlConfig(connStr) {
  const parts = connStr.split(";");
  const cfg = {};

  parts.forEach(part => {
    const [key, value] = part.split("=");
    if (!key || !value) return;

    switch (key.trim().toLowerCase()) {
      case "server":
        cfg.server = value.replace("tcp:", "");
        break;
      case "database":
        cfg.database = value;
        break;
      case "user id":
        cfg.user = value;
        break;
      case "password":
        cfg.password = value;
        break;
    }
  });

  cfg.port = 1433;
  cfg.options = { encrypt: true };

  return cfg;
}

async function testDb() {
  try {
    const connStr = process.env.DefaultConnection;

    if (!connStr) {
      console.log("❌ ERROR: DefaultConnection is NOT found in environment variables");
      return;
    }

    console.log("🔍 Raw connection string from Azure:", connStr);

    const sqlConfig = buildSqlConfig(connStr);

    console.log("🛠 Parsed SQL config:", sqlConfig);

    const pool = await sql.connect(sqlConfig);
    console.log("✅ Connected to SQL Database!");
  } catch (err) {
    console.error("❌ SQL Connection Failed:", err);
  }
}

testDb();

// Basic HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from Azure App Service + SQL!");
});

server.listen(process.env.PORT || 8080, () => {
  console.log("🌍 Server is running...");
});
