const express = require('express');
const orderController = require('./../controllers/orderController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get('/checkout-session/:productId', orderController.getCheckoutSession);

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    orderController.getOrder
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    orderController.deleteOrder
  );

module.exports = router;
