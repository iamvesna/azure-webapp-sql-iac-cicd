const http = require("http");
const sql = require("mssql");

async function testDbQuery() {
  try {
    // Azure injects connection strings using this variable name pattern:
    // SQLCONNSTR_<NAME>
    const conn = process.env.SQLCONNSTR_DefaultConnection;

    if (!conn) {
      return {
        success: false,
        message: "SQLCONNSTR_DefaultConnection NOT FOUND",
        error: null
      };
    }

    // mssql supports "sql.connect(connectionString)" directly
    const pool = await sql.connect(conn);
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
