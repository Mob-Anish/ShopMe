const express = require('express');
const morgan = require('morgan');

const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorController = require('./controllers/errorController');

const app = express();

if (process.env.NODE_ENV === 'development' || 'production') {
  app.use(morgan('dev'));
}

app.use(express.json());

//--------- Api Routes ----------//
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', productRouter);

// Handling unhandled request
// Handling req outside the app.
app.all('*', (req, res, next) => {
  // Sending Error to global error middleware.
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

//--------- GLOBAL ERROR MIDDLEWARE -------//
app.use(globalErrorController);

module.exports = app;
