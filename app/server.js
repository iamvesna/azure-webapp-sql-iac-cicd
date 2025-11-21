const sql = require("mssql");

const sqlConfig = {
  connectionString: process.env.SQLCONNSTR_DefaultConnection,
  options: {
    encrypt: true
  }
};

async function testDb() {
  try {
    console.log("Using connection:", sqlConfig.connectionString);

    const pool = await sql.connect(sqlConfig);
    console.log("✅ Connected to SQL Database!");
  } catch (err) {
    console.error("❌ SQL Connection Failed:", err);
  }
}

testDb();
