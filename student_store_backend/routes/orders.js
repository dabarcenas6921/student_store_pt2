const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const security = require("../middleware/security");
const { fetchUserByEmail } = require("../models/user");
const { BadRequestError } = require("../utils/errors");

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { email } = res.locals.user;
    const user = await fetchUserByEmail(email);
    const orders = await Order.listOrdersForUser(user.id);
    return res.status(201).json({ orders });
  } catch (err) {
    next(err);
  }
});

router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
  if (!req.body?.order) {
    throw new BadRequestError("missing error");
  }
  console.log(req.body);
  const { email } = res.locals.user;
  const user = await User.fetchUserByEmail(email);
  const order = await Order.createOrder(user, req.body.order);
  res.status(201).json({ order });
});

module.exports = router;
