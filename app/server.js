const express = require('express');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 8080;

// Azure App Service injects SQLCONNSTR_<name>
const connectionString =
  process.env.SQLCONNSTR_DefaultConnection ||
  process.env.SQL_CONNECTION_STRING;

console.log("Using SQL connection:", connectionString);

app.get('/', async (req, res) => {
  try {
    let pool = await sql.connect(connectionString);
    let result = await pool.request().query('SELECT GETDATE() AS now');
    res.send("Connected to SQL! Server time: " + result.recordset[0].now);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error: " + err.message);
  }
});

app.listen(port, () => console.log(`Running on ${port}`));
