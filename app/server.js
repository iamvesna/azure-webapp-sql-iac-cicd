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

/* ---- Build SQL config from environment variables (FIXED) ---- */
const sqlConfig = {
  server: process.env.SQL_SERVER + ".database.windows.net",
  port: 1433,                 // ⭐ REQUIRED FOR AZURE SQL
  database: process.env.SQL_DATABASE,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  options: {
    encrypt: true,
    enableArithAbort: true    // ⭐ prevents certain Azure SQL errors
  }
};

// Helpful for debugging
console.log("SQL ENV Loaded:", {
  SQL_SERVER: process.env.SQL_SERVER,
  SQL_DATABASE: process.env.SQL_DATABASE,
  SQL_USER: process.env.SQL_USER,
  SQL_PASSWORD: process.env.SQL_PASSWORD ? "Loaded" : "Missing"
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
