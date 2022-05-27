//------- Express Framework ----------//
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit'); // rate limiting
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes');
// const orderController = require('./controllers/orderController');
const viewRouter = require('./routes/viewRoutes');
const adminRouter = require('./routes/adminRoutes');
const AppError = require('./utils/appError');
const globalErrorController = require('./controllers/errorController');

const app = express();

app.enable('trust proxy');

// Setting pug for view template
app.set('view engine', 'pug');
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, '/views/admin'),
  path.join(__dirname, '/views/admin/product'),
  path.join(__dirname, '/views/admin/user'),
  path.join(__dirname, '/views/admin/sidebar'),
  path.join(__dirname, '/views/admin/order'),
]);

//------------ GLOBAL MIDDLEWARE ---------//

// Implement CORS
app.use(cors());
// Access-Control-Allow-Origin
// app.use(
//   cors({
//     origin: 'https://www.shopme.com',
//   })
// );

app.options('*', cors());

//------ Serving Static Files -------//
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'development' || 'production') {
  app.use(morgan('dev'));
}

// Rate Limiting to api request
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request, please try again in an hour!!',
});
// Limiting req only to api route
app.use('/api', limiter);

// Stripe Checkout
// app.post(
//   '/webhook-checkout',
//   express.raw({ type: 'application/json' }),
//   orderController.webhookCheckout
// );

// Body parser, reading data from body in req.body
app.use(express.json());
app.use(cookieParser()); // It will add cookies to request

// Data Sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data Sanitization against XSS
app.use(xss());

// Test Middleware
app.use((req, res, next) => {
  next();
});

app.use(compression());

//--------- Api Routes ----------//
app.use('/', viewRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/admin', adminRouter); // For admin only

// Handling unhandled request
// Handling req outside the app.
app.all('*', (req, res, next) => {
  // Sending Error to global error middleware.
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

//--------- GLOBAL ERROR MIDDLEWARE -------//
app.use(globalErrorController);

module.exports = app;
