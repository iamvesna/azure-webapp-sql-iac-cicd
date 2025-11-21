const http = require("http");
const sql = require("mssql");

// 🌟 Read SQL connection string from environment-variable
const connectionString = process.env.DefaultConnection;

console.log("SQL connection from env:", connectionString);

async function testDb() {
  try {
    const pool = await sql.connect(connectionString);
    console.log("✅ Connected to SQL Database!");
  } catch (err) {
    console.error("❌ SQL Connection Failed:", err);
  }
}

testDb();

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from Azure App Service!");
});

server.listen(process.env.PORT || 8080, () => {
  console.log("Server is running...");
});
