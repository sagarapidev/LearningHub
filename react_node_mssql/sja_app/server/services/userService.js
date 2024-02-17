// userService.js
const sql = require("mssql");
const dbConfig = require("../config/dbConfig");
const User = require("../modal/user/User");

//Fetch all users
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
//Get by UserId
async function getUserById(userId) {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .query(`SELECT * FROM users WHERE UserID = ${userId}`);

    return result.recordset[0]; // Assuming ID is unique, so return the first result
  } catch (error) {
    console.error(
      `Error fetching user with ID ${userId} from the database:`,
      error
    );
    throw error;
  }
}

// Create a new user
async function createUser(userData) {
  try {
    const pool = await sql.connect(dbConfig);
    await pool.request()
      .query(`INSERT INTO users (user_first_name, user_last_name, dob, status)
      VALUES('${userData.user_first_name}', '${userData.user_last_name}', '${userData.dob}', '${userData.status}');`);

    // Since the user is successfully inserted, return the user data without relying on userId
    return userData;
  } catch (error) {
    console.error("Error creating user in the database:", error);
    throw error;
  }
}

async function updateUser(userId, userData) {
  try {
    const pool = await sql.connect(dbConfig);
    await pool.request().query(`UPDATE users 
              SET user_first_name = '${userData.user_first_name}', 
                  user_last_name = '${userData.user_last_name}', 
                  dob = '${userData.dob}', 
                  status = '${userData.status}' 
              WHERE UserID = ${userId}`);

    // Fetch and return the updated user after the update operation
    const updatedUser = await getUserById(userId);
    return updatedUser;
  } catch (error) {
    console.error(
      `Error updating user with ID ${userId} in the database:`,
      error
    );
    throw error;
  }
}

async function deleteUser(userId) {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query(`DELETE FROM users WHERE UserID = ${userId}`);

    // Check if any rows were affected by the delete operation
    if (result.rowsAffected[0] === 0) {
      throw new Error(`User with ID ${userId} not found`);
    }

    return userId;
  } catch (error) {
    console.error(`Error deleting user with ID ${userId} from the database:`, error);
    throw error;
  }
}


module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
