const express = require('express');
const router = express.Router();
const auth = require('./auth');

router.get('/', (req, res) => {
    // Get content endpoint
    res.render('home', {
        user: null
    });
});

router.get('/content', auth, (req, res) => {
    console.log('---__ahihi_---', req.session.user);
    // Get content endpoint
    res.render('home', {
        user: req.session.user
    });
});

module.exports = router;