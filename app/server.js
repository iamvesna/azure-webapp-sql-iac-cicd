const express = require('express');
const sql = require('mssql');

/* -----------------------------
   APPLICATION INSIGHTS (Azure)
-------------------------------- */
const appInsights = require("applicationinsights");

if (process.env.APPLICATIONINSIGHTS_CONNECTION_STRING) {
  console.log("Application Insights initialized.");

  appInsights
    .setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING)
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectPerformance(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectConsole(true)
    .setSendLiveMetrics(true)
    .start();
} else {
  console.log("APPLICATIONINSIGHTS_CONNECTION_STRING not found. Skipping AI initialization.");
}

/* -----------------------------
   EXPRESS SERVER + SQL CONFIG
-------------------------------- */

const app = express();
const port = process.env.PORT || 8080;

/* ---- Build SQL config from environment variables ---- */
const sqlConfig = {
  server: `${process.env.SQL_SERVER}.database.windows.net`,
  database: process.env.SQL_DATABASE,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,  // Key Vault reference resolved by Azure!
  port: 1433,
  options: {
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: false
  }
};

/* Debug info (safe) */
console.log("SQL ENV Loaded:", {
  SQL_SERVER: sqlConfig.server,
  SQL_DATABASE: sqlConfig.database,
  SQL_USER: sqlConfig.user,
  SQL_PASSWORD: sqlConfig.password ? "Loaded" : "Missing"
});

/* -----------------------------
   ENDPOINTS
-------------------------------- */

app.get("/healthz", (req, res) => res.send("OK"));

app.get('/', async (req, res) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query('SELECT GETDATE() AS now');

    res.send("Connected to SQL! Server time: " + result.recordset[0].now);
  } catch (err) {
    console.error("SQL Error:", err);
    res.status(500).send("DB error: " + err.message);
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
