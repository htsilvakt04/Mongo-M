const express = require('express');
const router = express.Router();
const auth = require('./auth');

router.get('/', (req, res) => {
    // Get content endpoint
    res.render('home', {
        user: req.session.user
    });
});

router.get('/content', auth, (req, res) => {
    // Get content endpoint
    res.render('home', {
        user: req.session.user
    });
});

module.exports = router;