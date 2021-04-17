const Product = require('../models/productModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

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
