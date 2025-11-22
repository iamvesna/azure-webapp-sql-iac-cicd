const http = require("http");
const sql = require("mssql");

const PORT = process.env.PORT || 8080;

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from Azure App Service!");
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// SQL CONFIG
const sqlConfig = {
  connectionString: process.env.SQLCONNSTR_DefaultConnection,
  options: {
    encrypt: true
  }
};

console.log("ENV READ:", process.env.SQLCONNSTR_DefaultConnection);

async function testDb() {
  try {
    console.log("Using connection:", sqlConfig.connectionString);

    const pool = await sql.connect(sqlConfig);
    console.log("✅ Connected to SQL Database!");

    const result = await pool.request().query("SELECT 1 AS TestValue");
    console.log("Result:", result.recordset);

  } catch (err) {
    console.error("❌ SQL Connection Failed:", err);
  }
}

testDb();
