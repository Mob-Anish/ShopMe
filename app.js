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

const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes');
const viewRouter = require('./routes/viewRoutes');
const AppError = require('./utils/appError');
const globalErrorController = require('./controllers/errorController');

const app = express();

// Setting pug for view template
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//------------ GLOBAL MIDDLEWARE ---------//

//------ Serving Static Files -------//
app.use(express.static(path.join(__dirname, 'public')));

// Security HTTP Header
//app.use(helmet());

if (process.env.NODE_ENV === 'development' || 'production') {
  console.log(process.env.NODE_ENV);
  app.use(morgan('dev'));
}

// // Rate Limiting to api request
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many request, please try again in an hour!!',
// });
// // Limiting req only to api route
// app.use('/api', limiter);

// Body parser, reading data from body in req.body
app.use(express.json());
app.use(cookieParser()); // It will add cookies to request

// Data Sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data Sanitization against XSS
app.use(xss());

// Test Middleware
app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});

//--------- Api Routes ----------//
app.use('/', viewRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orders', orderRouter);

// Handling unhandled request
// Handling req outside the app.
app.all('*', (req, res, next) => {
  // Sending Error to global error middleware.
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

//--------- GLOBAL ERROR MIDDLEWARE -------//
app.use(globalErrorController);

module.exports = app;
