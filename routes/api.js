const express = require('express');
const router = express.Router();
const auth = require('./auth')
const itemController = require('../controllers/item');
const cartController = require('../controllers/cart');

const loginRoutes = require('./login');
const logoutRoutes = require('./logout');
const registerRoutes = require('./register');
const cartRoutes = require('./cart');

// auth routes
router.use('/login', loginRoutes);
router.use('/register', registerRoutes);
router.use('/logout', logoutRoutes);
router.use('/cart', cartRoutes);
// data routes









// get items for : go though pages + when selecting the category

router.get('/items', itemController.retrieveItems);

// add review for item
router.post("/item/:itemId/reviews", function(req, res) {
    "use strict";
    let itemId = xss(parseInt(req.params.itemId));
    let review = xss(req.body.review);
    let name = xss(req.body.name);
    let stars = xss(parseInt(req.body.stars));

    items.addReview(itemId, review, name, stars, function(itemDoc) {
        return res.json(itemDoc);
    });
});

router.get('/category/:name', function (req, res) {
    let categoryName = req.params.name;
    // items.getCategories(function(categories) {
    //     return res.json(categories);
    // })
    return res.json({data: 'silva'});
});
module.exports = router;