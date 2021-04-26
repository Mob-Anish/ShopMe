const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'Order must belong to a Product!'],
  },
  quantity: {
    type: Number,
    required: [true, 'Order must have a quantity'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Order must belong to a User!'],
  },
  price: {
    type: Number,
    require: [true, 'Order must have a price.'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
