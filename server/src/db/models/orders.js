const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
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
  amount: {
    type: Number,
    required: true
  },
  address: {
    type: Object,
    required: true
  },
  status:{
    type: String,
    default: 'Pending'
  }
}, {timestamps: true});

const orderModel = model('Orders', orderSchema);
module.exports = orderModel;