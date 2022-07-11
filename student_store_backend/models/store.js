const db = require("../db");

class Store {
  static async listProducts() {
    //List all products in the database
    const query = "SELECT * FROM products";
    const result = await db.query(query);
    return result.rows;
  }
}

module.exports = Store;
