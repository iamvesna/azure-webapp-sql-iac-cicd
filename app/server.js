const http = require("http");
const sql = require("mssql");

const server = http.createServer(async (req, res) => {

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write("Hello from Azure App Service!\n\n");

  try {
    const connectionString = process.env.SQLCONNSTR_DefaultConnection;

    if (!connectionString) {
      res.end("❌ SQLCONNSTR_DefaultConnection NOT FOUND");
      return;
    }

    await sql.connect(connectionString);
    res.end("✅ Connected to SQL Database!");

  } catch (err) {
    res.end("❌ SQL Connection Failed:\n" + err);
  }
});

server.listen(process.env.PORT || 8080, () => {
  console.log("Server is running...");
});
