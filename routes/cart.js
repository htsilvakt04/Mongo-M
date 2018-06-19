const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');
const auth = require('./auth');

router.get('/', auth, cartController.retrieveCarts);
router.post('/item', auth, cartController.saveItemToCart);
router.put('/item/quantity', auth, cartController.updateItemQuantity);

module.exports = router;