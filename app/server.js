const http = require("http");
const sql = require("mssql");

// SQL config uses environment variable from Azure
const sqlConfig = {
  connectionString: process.env.SQLCONNSTR_DefaultConnection,
  options: {
    encrypt: true
  }
};

async function testDbQuery() {
  try {
    const pool = await sql.connect(sqlConfig);

    // Run a simple SQL query
    const result = await pool.request().query("SELECT TOP 1 name FROM sys.tables");

    return {
      success: true,
      message: "SQL Query OK",
      result: result.recordset
    };

  } catch (err) {
    return {
      success: false,
      message: "SQL Query FAILED",
      error: err.message
    };
  }
}

const server = http.createServer(async (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });

  const dbResult = await testDbQuery();

  res.end(JSON.stringify({
    status: "App running",
    db: dbResult
  }, null, 2));
});

server.listen(process.env.PORT || 8080);
