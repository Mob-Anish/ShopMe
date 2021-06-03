const Product = require('../models/productModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

//---- Get the search keyword product ------//
exports.getSearchProduct = catchAsync(async (req, res, next) => {
  const products = await Product.find(req.query);

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products,
    },
  });
});

//---- Get all products ----//
exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find(req.query);

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products,
    },
  });
});

//------ Get specific product from database ------//
// req.params means the parameter in url which we can define like '/:id' in routes and we can get the id. (req.params.id)
exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  // Tour.findOne({ _id: req.params.id });

  // Creating Error if there is null data
  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

//---- Create new product ----//
exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      product: newProduct,
    },
  });
});

//---- Update product ----//
exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

//------- Deleting  data in database ---------//
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError('No product found with that ID', 401));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
