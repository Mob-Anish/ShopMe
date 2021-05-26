//-------- AUTHENTICATION ---------//
const User = require('./../models/userModel');
const { promisify } = require('util'); // Util is built-in model
const jwt = require('jsonwebtoken'); // library for authentication
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Email = require('../utils/email');

// TOKEN CREATION using JWT.
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Sending JWT web tokens.
const createSendToken = (user, statusCode, res) => {
  // Calling Token function
  const token = signToken(user._id);

  // Sending token through cookie
  const cookieOptions = {
    // In miliseconds
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // For production mode (HTTPS)
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove the password from response
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

//---- SIGN UP ----//
exports.signup = catchAsync(async (req, res, next) => {
  // Manually specifying field
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // SEND EMAIL IN YOUR ADDRESS (NEW SIGNUP)
  const url = `${req.protocol}://${req.get('host')}/`;
  await new Email(newUser, url).sendWelcome();

  createSendToken(newUser, 201, res); // jwt token
});

//---- LOGIN ----//
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // 2) Check if the user exists && password is correct
  // password set to false so select it
  const user = await User.findOne({ email }).select('+password');
  // Here we use the instance method from usermodel
  // correctPassword is an async function
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If ok, send token to client
  createSendToken(user, 200, res); // jwt token
});

// PROTECT ROUTES FROM UNAUTHORIZED ACCESSS (Authentication, Verification) AFTER LOGIN OR SIGNUP PROCESS
exports.protect = catchAsync(async (req, res, next) => {
  let token;

  // 1) Getting token and check if its there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // Checking in browser site cookies which will be in req.cookies
  else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token)
    return next(new AppError('You should be logged in to get access 🚫🚫', 401));

  // 2) Validate token (Verification)
  // Here we use promisify to call the function and it return promise.
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // Invalid token
  if (!decoded) {
    return next(new AppError('Invalid token', 401));
  }

  // 3) Check if user still exists
  const freshUser = await User.findById(decoded.id); // id is decoded payload which is userid

  // If user doesnot exist in database even if token valid
  if (!freshUser) {
    return next(
      new AppError('The user belonging to this token does no longer exist', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = freshUser;
  res.locals.user = freshUser; // for pug template
  next();
});

// Only for rendered pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) Verify the token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const freshUser = await User.findById(decoded.id); // id is decoded payload which is userid

      // If user doesnot exist in database even if token valid
      if (!freshUser) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      // req.locals for pug template
      res.locals.user = freshUser;
      return next();
    } catch (err) {
      return next();
    }
  }

  next();
};

// Logged Out from Account
// Using dummy token to logout the user
// Note: We can't manipulate the cookies at first place
exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 1 * 1000), // 1secs
    httpOnly: true,
  });

  res.status(200).json({
    status: 'success',
  });
};

// Authorization
// You have to admin
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin']
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You dont have the permission of administrator to perform the action 🚫🚫', 403)
      );
    }

    next();
  };
};
