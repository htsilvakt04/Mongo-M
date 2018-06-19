const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');
const auth = require('./auth');

router.get('/', auth, cartController.retrieveCarts);

router.route('/item')
    .post(auth, cartController.saveItemToCart)
    .delete(auth, cartController.removeItemOutOfCart)

router.put('/item/quantity', auth, cartController.updateItemQuantity);


module.exports = router;