const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

// Main page
router.get('/', authController.isLoggedIn, viewController.getShopMe);

// Product Page
router.get('/products/:slug', authController.isLoggedIn, viewController.getProduct);

// Login Page
router.get('/login', authController.isLoggedIn, viewController.login);

// Account Page
router.get('/account/:name', authController.protect, viewController.getAccount);

module.exports = router;
