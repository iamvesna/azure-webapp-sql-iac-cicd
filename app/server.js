const express = require('express');
const sql = require('mssql');

/* -----------------------------
   APPLICATION INSIGHTS (Azure)
-------------------------------- */
const appInsights = require("applicationinsights");

// Enable Application Insights ONLY if the connection string is present
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

/* ---- NEW: Build SQL config from environment variables ---- */
const sqlConfig = {
  server: process.env.SQL_SERVER + ".database.windows.net",
  database: process.env.SQL_DATABASE,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  options: {
    encrypt: true
  }
};

console.log("SQL Config Loaded:", {
  server: sqlConfig.server,
  database: sqlConfig.database,
  user: sqlConfig.user
});

/* -----------------------------
   ENDPOINTS
-------------------------------- */

// Simple health check endpoint
app.get("/healthz", (req, res) => res.send("OK"));

// Root endpoint that queries SQL
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
