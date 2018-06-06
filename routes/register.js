const express = require('express');
const router = express.Router();
const registerController = require('../controllers/regiter');
const { redirectIfLoggedin } = require('../controllers/share');


// Login endpoint
router.all(redirectIfLoggedin);

router.route('/')
    .get(registerController.showFormOrRedirect)
    .post(registerController.regiterUser);


module.exports = router;