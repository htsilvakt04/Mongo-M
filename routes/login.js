const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');

router.route('/')
    .get(loginController.showFormOrRedirect)
    .post(loginController.logUserIn);

router.route('/social/verify/:name')
    .post(loginController.verifySocial)


module.exports = router;