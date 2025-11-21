const http = require("http");
const sql = require("mssql");

// ================================
// SQL Connection Test Endpoint
// ================================
async function dbTestHandler(res) {
  try {
    const pool = await sql.connect(process.env.DefaultConnection);
    const result = await pool.request().query("SELECT 1 AS test");

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result.recordset));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
  }
}

// ============================
// MAIN HTTP SERVER
// ============================
const server = http.createServer(async (req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello from Azure App Service!");
    return;
  }

  if (req.url === "/dbtest") {
    return dbTestHandler(res);
  }

  // Default 404
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
});

// ============================
// START SERVER
// ============================
server.listen(process.env.PORT || 8080, () => {
  console.log("✔ Server is running...");
});

// ============================
// Initial SQL connection test
// ============================
async function testDb() {
  try {
    await sql.connect(process.env.DefaultConnection);
    console.log("🎉 Connected to SQL Database successfully!");
  } catch (err) {
    console.error("❌ SQL Connection Failed:", err);
  }
}

testDb();
