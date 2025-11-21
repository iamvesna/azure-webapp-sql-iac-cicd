const http = require("http");
const sql = require("mssql");

// Create HTTP Server
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from Azure App Service + SQL!");
});

server.listen(process.env.PORT || 8080);

// SQL CONFIG – parses the connection string correctly
const sqlConfig = {
  connectionString: process.env.DefaultConnection,
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

async function testDb() {
  try {
    console.log("Connecting to SQL...");
    const pool = await sql.connect(sqlConfig);
    console.log("✅ Connected to SQL Database!");

    const result = await pool.request().query("SELECT GETDATE() AS currentTime");
    console.log("🕒 SQL Response:", result.recordset);

  } catch (err) {
    console.error("❌ SQL Connection Failed:", err);
  }
}

testDb();
