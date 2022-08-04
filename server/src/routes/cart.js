const express = require("express");
const router = express.Router();
const Carts = require("../db/models/cart");

// Find Cart
router.get('/:id', async (req, res, next) => {
  try {
    const cart = await Carts.findOne({ownerId: req.params.id});
    res.status(200).json({
      status: 200,
      cart: cart,
    })
  } catch (error) {
    next(error);
  }
});

// Add item to cart
router.put("/:id", async (req, res, next) => {
  try {
    const cart = await Carts.findByIdAndUpdate(
      cartId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      status: 200,
      message: 'Product added to cart',
      cart: cart
    })
  } catch (error) {
    next(error);
  }
});


module.exports = router;
