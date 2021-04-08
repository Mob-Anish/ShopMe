const express = require('express');
const viewController = require('../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getShopMe);

router.get('/products/:slug', viewController.getProduct);

module.exports = router;
