
const mysql = require('mysql2/promise');
require('dotenv').config();

class Database {
  constructor() {
    this.con = mysql.createPool({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    });
  }

  async query(sql, params) {
    try {
      const [results] = await this.con.execute(sql, params);
      return results;
    } catch (err) {
      console.error("Database error:", err);
      return Error(`Database error: ${err.message}`);
    }
  }
}

module.exports = Database;
