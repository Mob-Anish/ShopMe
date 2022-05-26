const express = require('express');
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/dashboard').get(authController.protect, authController.restrictTo('admin'), adminController.getAdminPanel);
router.route('/products').get(authController.protect, authController.restrictTo('admin'), adminController.getProductPanel);
router.route('/users').get(authController.protect, authController.restrictTo('admin'), adminController.getUserPanel);
router.route('/orders').get(authController.protect, authController.restrictTo('admin'), adminController.getOrderPanel); 
router.route('/account').get(authController.protect, authController.restrictTo('admin'), adminController.getAccountPanel); 
router.route('/products/new-product').get(authController.protect, authController.restrictTo('admin'), adminController.getNewProduct);
router.route('/users/new-user').get(authController.protect, authController.restrictTo('admin'), adminController.getNewUser);
router.route('/products/update-product/:id').get(authController.protect, authController.restrictTo('admin'), adminController.getEditProduct);
router.route('/users/update-user/:id').get(authController.protect, authController.restrictTo('admin'), adminController.getEditUser);
router.route('/products/delete-product/:id').get(authController.protect, authController.restrictTo('admin'), adminController.getDeleteProduct);
router.route('/users/delete-user/:id').get(authController.protect, authController.restrictTo('admin'), adminController.getDeleteUser);
router.route('/orders/delete-order/:id').get(authController.protect, authController.restrictTo('admin'), adminController.getDeleteOrder);

module.exports = router;
