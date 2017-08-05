/**
 * Created by HYT on 8/3/2017.
 */
var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;

router.get('/', checkLogin, function(req, res, next) {
    req.session.user = null;
    res.send(req.flash('success', 'Log out'));
    res.redirect('/posts');
});

module.exports = router;