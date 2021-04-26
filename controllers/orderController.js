const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Stripe package
const Product = require('./../models/productModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Integrating checkout session(stripe api)
exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently bought product
  const product = await Product.findById(req.params.productId);

  // 2) Create Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/product/${product.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.productId,
    line_items: [
      {
        name: product.name,
        description: product.description,
        amount: product.price * 100,
        currency: 'npr',
        quantity: 1,
      },
    ],
  });

  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});
