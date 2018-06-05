const express = require('express');
const router = express.Router();
const auth = require('./auth');

// Logout endpoint
router.get('/', auth, (req, res) => {
    req.session.destroy();
    res.send("logout success!");
});

module.exports = router;