const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

// Signup
router.post('/signup', authController.signup);
// Login
router.post('/login', authController.login);

//----- Users route -----//
router.route('/').get(userController.getAllUsers);

module.exports = router;
    