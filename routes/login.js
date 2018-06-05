const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');
const { redirectIfLoggedin } = require('../controllers/share');


// Login endpoint
router.all(redirectIfLoggedin);

router.route('/')
    .get(loginController.showFormOrRedirect)
    .post(loginController.logUserIn);


module.exports = router;