// const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Product = require('../models/productModel');
const User = require('../models/userModel');
const Order = require('../models/orderModel');

// Date
let months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
let days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

// Home panel
exports.getAdminPanel = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  const users = await User.find();
  const orders = await Order.find();

  // Calculating date
  let now = new Date();

  const date = {
    day: days[now.getDay()],
    date: now.getDate(),
    month: months[now.getMonth()],
    year: now.getFullYear(),
  };

  const numberOf = {
    Products: products.length,
    Users: users.length,
    Orders: orders.length,
  };

  res.render('dashboard', {
    title: 'Admin Panel',
    numberOf,
    date,
  });
});

// Products panel
exports.getProductPanel = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  res.render('productsPanel', {
    title: 'Products Panel',
    products,
  });
});

// Users panel
exports.getUserPanel = catchAsync(async (req, res, next) => {
  const users = await User.find().select('+password');
  console.log(users);

  res.render('usersPanel', {
    title: 'Users Panel',
    users,
  });
});

// Orders panel
exports.getOrderPanel = catchAsync(async (req, res, next) => {
  const orders = await Order.find();

  res.render('ordersPanel', {
    title: 'Orders Panel',
    orders,
  });
});

// Admin Account panel
exports.getAccountPanel = (req, res, next) => {
  res.render('adminAccount', {
    title: 'Your Account',
  });
};

// New Product Page
exports.getNewProduct = (req, res, next) => {
  res.render('newProduct', {
    title: 'Create new product',
  });
};

// New User Page
exports.getNewUser = (req, res, next) => {
  res.render('newUser', {
    title: 'Create new user',
  });
};

//  Edit Product Page
exports.getEditProduct = catchAsync(async (req, res, next) => {
  const productData = await Product.findById(req.params.id);

  res.render('updateProduct', {
    title: 'Update product',
    productData,
  });
});

// Edit User Page
exports.getEditUser = catchAsync(async (req, res, next) => {
  const userData = await User.findById(req.params.id);

  res.render('updateUser', {
    title: 'Update user',
    userData,
  });
});

// Delete Product Page
exports.getDeleteProduct = catchAsync(async (req, res, next) => {
  const productData = await Product.findById(req.params.id);

  res.render('deleteProduct', {
    title: 'Delete Product',
    productData,
  });
});

// Delete User Page
exports.getDeleteUser = catchAsync(async (req, res, next) => {
  const userData = await User.findById(req.params.id);

  res.render('deleteUser', {
    title: 'Delete User',
    userData,
  });
});
// Delete Order Page
exports.getDeleteOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  res.render('deleteOrder', {
    title: 'Delete Order',
    order,
  });
});
