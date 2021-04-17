const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

// Signup
router.post('/signup', authController.signup);
// Login
router.post('/login', authController.login);
// Logout
router.get('/logout', authController.logout);

//----- Users route -----//
router.route('/').get(authController.protect, userController.getAllUsers);

module.exports = router;