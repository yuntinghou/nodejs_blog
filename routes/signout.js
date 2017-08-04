/**
 * Created by HYT on 8/3/2017.
 */
var express = require('express');
var router = express.Router();

var checkNotLogin = require('../middlewares/check').checkNotLogin;

router.get('/', checkNotLogin, function(req, res, next) {
    res.send(req.flash());
});

module.exports = router;