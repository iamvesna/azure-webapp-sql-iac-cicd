const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from Azure App Service!");
});

server.listen(process.env.PORT || 8080);

const sql = require("mssql");

async function testDb() {
  try {
    const pool = await sql.connect(process.env.DefaultConnection);
    console.log("✅ Connected to SQL Database!");
  } catch (err) {
    console.error("❌ SQL Connection Failed:", err);
  }
}

testDb();
