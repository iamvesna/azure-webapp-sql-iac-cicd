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

// Azure injects connection strings as SQLCONNSTR_<name>
const connectionString =
  process.env.SQLCONNSTR_DefaultConnection ||
  process.env.SQL_CONNECTION_STRING;

console.log("Using SQL connection:", connectionString);

// Simple health check endpoint
app.get("/healthz", (req, res) => res.send("OK"));

// Root endpoint that queries SQL
app.get('/', async (req, res) => {
  try {
    let pool = await sql.connect(connectionString);
    let result = await pool.request().query('SELECT GETDATE() AS now');

    res.send("Connected to SQL! Server time: " + result.recordset[0].now);
  } catch (err) {
    console.error("SQL Error:", err);
    res.status(500).send("DB error: " + err.message);
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
