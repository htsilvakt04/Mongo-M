const express = require('express');
const router = express.Router();
const registerController = require('../controllers/regiter');
const { redirectIfLoggedin } = require('../controllers/share');

router.route('/')
    .get(registerController.showFormOrRedirect)
    .post(registerController.regiterUser);
router.route('/login')
    .get(registerController.showFormOrRedirect)
    .post(registerController.regiterUser);

router.get('/category/:name', function (req, res) {
    let categoryName = req.params.name;
    items.getCategories(function(categories) {
        return res.json(categories);
    })
});

// get items for : go though pages + when selecting the category
router.get('/items', function (req, res) {
    let {category, skip, limit} = req.query;
    items.getItems(category, skip, limit, function(pageItems) {
        return res.json(pageItems);
    })
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