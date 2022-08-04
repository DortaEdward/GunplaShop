const express = require("express");
const router = express.Router();
const Products = require("../db/models/product");

// seed in products
router.post("/seed", async (req, res, next) => {
  
});

// Get all products
router.get("/", async (req, res, next) => {
  // Queries Params
  const { category, name, grade } = req.query;
  const searchQueries = { name, grade };

  // Pagination Params
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const startIndex = (page - 1) * limit;
    const endIndex = page * startIndex;
    const results = {};

    results.page = page;
    results.next = page + 1;
    if (results.page > 1) results.previous = page - 1;

    results.products = [];
    if (category) {
      results.products = await Products.find({
        categories: {
          $in: [category],
        },
      })
        .skip(startIndex)
        .limit(endIndex);
    } else if (searchQueries) {
      results.products = await Products.find(searchQueries)
        .skip(startIndex)
        .limit(endIndex);
    } else {
      results.products = await Products.find().skip(startIndex).limit(endIndex);
    }
    results.length = results.products.length;
    res.status(200).json({status:200}, results);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

// Get product
router.get("/find/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Products.findById(id);
    res.status(200).json({
      status: 200,
      product: product,
    });
  } catch (error) {
    res.status(500);
    next(error);
  }
});

// Update Product
router.put("/:id", async (req, res, next) => {
  try {
    await Products.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      status: 200,
      message: "Product updated",
    });
  } catch (error) {
    next(error);
  }
});

// Delete Product
router.delete("/:id", async (req, res, next) => {
  try {
    await Products.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 200,
      message: "Product Deleted",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
