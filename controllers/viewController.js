const Product = require('../models/productModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Order = require('../models/orderModel');

// Rendering shopme(shopme.pug)(main page)
exports.getShopMe = catchAsync(async (req, res) => {
  // 1) Get products data from collection
  const products = await Product.find();

  // 2) Build template
  // 3) Render that template using product data from 1)
  res.status(200).render('shopme', {
    title: 'Online Shoppingu',
    products,
  });
});

// Rendering single product view
exports.getProduct = catchAsync(async (req, res, next) => {
  // Get specific product data from collection
  const product = await Product.findOne({ slug: req.params.slug });

  if (!product) {
    return next(new AppError('There is no product with that name', 404));
  }

  // 2) Build template
  // 3) Render that template using data from 1)
  res.status(200).render('product', {
    title: `${product.name}`,
    product,
  });
});

// Rendering login page
exports.login = catchAsync(async (req, res) => {
  res.status(200).render('login', {
    title: 'Log In',
  });
});

// Rendering account page
exports.getAccount = catchAsync(async (req, res) => {
  res.status(200).render('account', {
    title: `${res.locals.user.name}`,
  });
});

// Rendering users order products page
exports.getMyProducts = catchAsync(async (req, res, next) => {
  // 1) Find all orders
  const orders = await Order.find({ user: req.user.id });

  // If there is no order from user.
  if (orders == '') {
    return res.status(200).render('noOrder', {
      title: `NoOrder!!`,
    });
  }

  // 2) Find products from orders db
  const productIds = orders.map((el) => el.product);
  // $in is used to find all the products having ids in productIds.
  const products = await Product.find({ _id: { $in: productIds } });

  // 3) Render order items
  res.status(200).render('orders', {
    title: 'My orders',
    orders,
    products,
  });
});
