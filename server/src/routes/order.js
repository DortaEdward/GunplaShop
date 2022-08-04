const express = require("express");
const router = express.Router();
const Orders = require("../db/models/orders");

// Create Order
router.post("/", async (req, res, next) => {
  try {
    const order = await Orders.create(req.body);
    await order.save();
    res.status(200).json({
      status: 200,
      message: "Order created",
      order: order,
    });
  } catch (error) {
    next(error);
  }
});

// Get orders
router.get("/", async (req, res, next) => {
  const { ownerId, orderId } = req.query;
  try {
    if (ownerId) {
      const orders = await Orders.find({ ownerId: ownerId });
      res.status(200).json({
        status: 200,
        orders: orders,
      });
    }
    if (orderId) {
      const orders = await Orders.findById(orderId);
      res.status(200).json({
        status: 200,
        orders: orders,
      });
    }
  } catch (error) {
    next(error);
  }
});

// Update Order
router.put("/:id", async (req, res, next) => {
  try {
    const order = await Orders.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      status: 200,
      order: order,
    });
  } catch (error) {
    next(error);
  }
});

// Delete Order
router.delete('/:id', async (req, res, next) => {
  try {
    await Orders.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Order Deleted',
    })
  } catch (error) {
    next(error);
  }
});

module.exports = router;
