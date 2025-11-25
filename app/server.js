const express = require('express');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 8080;

const connectionString =
  process.env.SQLCONNSTR_DefaultConnection ||
  process.env.sqlconnstr_defaultconnection ||
  process.env.DEFAULTCONNECTION;

console.log("Using SQL connection:", connectionString);

const config = {
  connectionString: connectionString,
  options: {
    encrypt: true
  }
};

app.get('/', async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query('SELECT GETDATE() AS CurrentTime');
    res.send(`Connected to SQL! Server time: ${result.recordset[0].CurrentTime}`);
  } catch (err) {
    console.error("SQL Error:", err);
    res.status(500).send("Failed to connect to SQL");
  }
});

app.listen(port, () => console.log(`App running on port ${port}`));
