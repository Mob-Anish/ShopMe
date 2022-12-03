const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Stripe package
const Product = require('../models/productModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Order = require('../models/orderModel');
const Email = require('../utils/email');

// Integrating checkout session(stripe api)
exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently bought product
  const product = await Product.findById(req.params.productId);

  // 2) Create Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/?product=${
      req.params.productId
    }&user=${req.user.id}&price=${product.price}`,
    // success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/products/${product.slug}`,
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

// CreateOrder
// It acts as a middleware in the root route ('/')
// After payment the success route create an  order in db.
exports.createOrder = catchAsync(async (req, res, next) => {
  // In the query string but it is temporary and unsecure
  const { product, user, price } = req.query;

  if (!product && !user && !price) return next();

  // Create new order in DB
  await Order.create({ product, user, price });

  const users = await User.findById({ _id: user });

  // SEND EMAIL IN YOUR ADDRESS (After order)
  const url = `https://shop-me-retro.onrender.com/account/${users.name}/my-orders`;
  await new Email(users, url).sendOrderResponse();

  // Redirect to home page.
  res.redirect(`${req.protocol}://${req.get('host')}/`);
});

// const createOrder = async (session) => {
//   const product = session.client_reference_id;
//   const user = (await User.findOne({ email: session.customer_email })).id;
//   const price = session.line_items[0].total / 100;

//   console.log(product, user, price);

//   await Order.create({ product, user, price });

//   // SEND EMAIL IN YOUR ADDRESS (After order)
//   const url = `/account/${user.name}/my-orders`;
//   await new Email(user, url).sendOrderResponse();
// };

// exports.webhookCheckout = (req, res, next) => {
//   const signature = req.headers['stripe-signature'];
//   console.log('webhook run');

//   let event;
//   try {
//     const event = stripe.webhooks.constructEvent(
//       req.body,
//       signature,
//       process.env.STRIPE_WEBHOOK_SECRET_KEY
//     );
//   } catch (err) {
//     return res.status(400).send(`Webhook error: ${err.message}`);
//   }

//   if (event.type === 'checkout.session.completed') {
//     console.log('webhook run 2');
//     createOrder(event.data.object);
//   }

//   res.status(200).json({ received: true });
// };

//---- Get all orders ----//
exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find(req.query);

  res.status(200).json({
    status: 'success',
    results: orders.length,
    data: {
      orders,
    },
  });
});

//------ Get specific order from database ------//
// req.params means the parameter in url which we can define like '/:id' in routes and we can get the id. (req.params.id)
exports.getOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  // Tour.findOne({ _id: req.params.id });

  // Creating Error if there is null data
  if (!order) {
    return next(new AppError('No order found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  });
});

// Deleting order from database
exports.deleteOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    return next(new AppError('No order found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: null,
  });
});
