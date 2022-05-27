const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');

const router = express.Router();

// Main page
router.get(
  '/',
  orderController.createOrder,
  authController.isLoggedIn,
  viewController.getShopMe
);

// Searched product page
router.get(
  '/search',
  authController.isLoggedIn,
  viewController.getSearchProduct
);

// Product Page
router.get(
  '/products/:slug',
  authController.isLoggedIn,
  viewController.getProduct
);

// Login Page
router.get('/login', authController.isLoggedIn, viewController.login);

// SignUp Page
router.get('/signup', authController.isLoggedIn, viewController.signUp);

// Account Page
router.get('/account/:name', authController.protect, viewController.getAccount);

// Order product page
router.get(
  '/account/:name/my-orders',
  authController.protect,
  viewController.getMyProducts
);

module.exports = router;
