// userService.js
const sql = require("mssql");
const dbConfig = require("../config/dbConfig");
const User = require("../modal/user/User");

async function getUsers() {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query("SELECT * FROM users");

    // Map SQL result to User objects
    return result.recordset.map((row) => new User(row));
  } catch (error) {
    console.error("Error fetching users from the database:", error);
    throw error;
  }
}

module.exports = {
  getUsers,
};
