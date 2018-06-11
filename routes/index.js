const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Get content endpoint
    return res.render('home');
});

module.exports = router;