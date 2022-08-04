const { Schema, model } = require("mongoose");

const stringConfig = {
  type: String,
  required: true,
};
const numberConfig = {
  type: Number,
  required: true,
};

const productSchema = new Schema({
  title: stringConfig,
  price: numberConfig,
  quantity: {
    ...numberConfig,
    default: 1,
  },
  description: stringConfig,
  images: [
    {
      type: String,
    },
  ],
  categories: {
    type: Array,
  },
  grade: stringConfig,
});

const productModel = model("Products", productSchema);
module.exports = productModel;
