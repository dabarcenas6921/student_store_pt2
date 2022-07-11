const express = require("express");
const router = express.Router();
const Store = require("../models/store");

router.get("/", async (req, res, next) => {
  try {
    let products = Store.listProducts();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
