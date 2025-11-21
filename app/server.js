const http = require("http");
const sql = require("mssql");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from Azure App Service!");
});

server.listen(process.env.PORT || 8080, () => {
  console.log("Server is running...");
});

async function testDb() {
  try {
    console.log("Connecting using:", process.env.DefaultConnection);
    const pool = await sql.connect(process.env.DefaultConnection);
    console.log("✅ Connected to SQL Database!");
  } catch (err) {
    console.error("❌ SQL Connection Failed:", err);
  }
}

testDb();
