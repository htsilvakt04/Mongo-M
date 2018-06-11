const express = require('express');
const router = express.Router();
const loginRoutes = require('./login');
const logoutRoutes = require('./logout');
const registerRoutes = require('./register');

// auth routes
router.use('/login', loginRoutes);
router.use('/register', registerRoutes);
router.use('/logout', logoutRoutes);

// data routes

router.get('/category/:name', function (req, res) {
    let categoryName = req.params.name;
    // items.getCategories(function(categories) {
    //     return res.json(categories);
    // })
    return res.json({data: 'silva'});
});

// get items for : go though pages + when selecting the category
router.get('/items', function (req, res) {
    let {category, skip, limit} = req.query;
    // items.getItems(category, skip, limit, function(pageItems) {
    //     return res.json(pageItems);
    // })
    return res.json({data: 'silva'});
});

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

module.exports = router;