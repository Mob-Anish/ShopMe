const Product = require('../models/productModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Order = require('../models/orderModel');

// Rendering shopme(shopme.pug)(main page)
exports.getShopMe = catchAsync(async (req, res, next) => {
  // 1) Get products data from collection
  const products = await Product.find();

  // 2) Build template
  // 3) Render that template using product data from 1)
  res.status(200).render('shopme', {
    title: 'Online Shoppingu',
    products,
  });
});

// Rendering serached product page
exports.getSearchProduct = catchAsync(async (req, res, next) => {
  // 1) Get products data from collection
  const products = await Product.find(req.query);

  // If there is no product
  if (products == '')
    return next(new AppError('There is no product with that name', 404));

  // 2) Build template
  // 3) Render that template using product data from 1)
  return res.status(200).render('shopme', {
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

// Rendering SignUp page
exports.signUp = catchAsync(async (req, res) => {
  res.status(200).render('signup', {
    title: 'Sign Up',
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
  console.log(orders);

  // Note: Due to populate of data in order model we can access data of product in orderpage.

  // If there is no order from user.
  if (orders == '') {
    return res.status(200).render('noOrder', {
      title: `NoOrder!!`,
    });
  }

  // 3) Render order items
  res.status(200).render('orders', {
    title: 'My orders',
    orders,
  });
});
