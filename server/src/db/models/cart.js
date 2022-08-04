const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
  ownerId : {
    type: Schema.Types.ObjectId,
    ref:'Users'
  },
  products : [
    {
      productId:{
        type: Schema.Types.ObjectId,
        ref:'Products'
      },
      quantity: {
        type: Number,
        default: 1,
      },
    }
  ],
}, {timestamps: true});

const cartModel = model('Carts', cartSchema);
module.exports = cartModel;