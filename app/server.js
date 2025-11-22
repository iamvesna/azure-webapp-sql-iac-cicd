const http = require("http");
const sql = require("mssql");

// Azure automatically injects SQL connection string into:
const connStr = process.env.SQLCONNSTR_DefaultConnection;

async function testDb() {
  try {
    if (!connStr) {
      console.error("❌ ERROR: SQLCONNSTR_DefaultConnection NOT FOUND");
      return;
    }

    console.log("🔗 Using connection string:", connStr);

    const pool = await sql.connect({
      connectionString: connStr,
      options: { encrypt: true }
    });

    console.log("✅ Connected to SQL Database!");
  } catch (err) {
    console.error("❌ SQL Connection Failed:", err);
  }
}

testDb();

// Create HTTP server
const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from Azure App Service!");
});

server.listen(PORT, () => console.log("🚀 Server running on port " + PORT));
