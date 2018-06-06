const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');
const { redirectIfLoggedin } = require('../controllers/share');


// Login endpoint
router.all(redirectIfLoggedin);

router.route('/')
    .get(loginController.showFormOrRedirect)
    .post(loginController.logUserIn);

router.route('/social/:name')
    .get(loginController.redirectSocial)

router.route('/social/verify/:name')
    .get(loginController.verifySocial)


module.exports = router;