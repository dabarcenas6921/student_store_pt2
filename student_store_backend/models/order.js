const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Order {
  static async listOrdersForUser(userId) {
    //method to return all orders that the authenticated user has created
    const ordersQuery = `SELECT orders.id AS orderId, orders.customer_id AS customer_id, order_details.quantity as quantity
    FROM orders
    JOIN order_details ON orders.id = order_details.order_id
    JOIN products ON order_details.product_id = products.id
    WHERE customer_id = $1`;

    const response = await db.query(ordersQuery, [userId]);
    return response.rows;
  }

  static async createOrder(user, order) {
    //Will take a user's order and store it in the database
    const ordersQuery = `INSERT INTO orders (customer_id)
                         VALUES ($1) RETURNING id`;

    const result = await db.query(ordersQuery, [user.id]);
    const orderId = result.rows[0].id;
    Object.keys(order).forEach((productId) => {
      const orderDetailsQuery = `INSERT INTO order_details (order_id, product_id, quantity, discount)
                                 VALUES ($1, $2, $3, $4)`;
      db.query(orderDetailsQuery, [
        orderId,
        Number(productId),
        order[productId],
        order[productId].discount,
      ]);
    });
    return order;
  }
}
module.exports = Order;
