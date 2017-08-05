var express = require('express');
var router = express.Router();
var PostModel = require('../models/posts');
var checkLogin = require('../middlewares/check').checkLogin;
router.get('/', function(req, res, next) {
    res.render('posts', {blog: {title:'cxhou blog', description:"oye"}});
});

router.post('/',checkLogin, function(req, res, next) {
    //res.send(req.flash());
    var author = req.session.user._id;
    var title = req.fields.title;
    var content = req.fields.content;

    try {
        if (!title.length) {
            throw new Error('Subject cannot be null');
        }
        if (!content.length) {
            throw new Error('Content cannot be null');
        }
    } catch(e) {
            req.flash('error', e.message);
            return res.redirect('back');
    }

    var post = {
        author: author,
        title: title,
        content: content,
        pv: 0
    };

    PostModel.create(post)
        .then(function(result) {
            post = result.ops[0];
            req.flash('success', 'Succefully posted');
            res.redirect('/posts/'+post.id);
        })
        .catch(next);
});

router.get('/create', checkLogin, function(req, res, next) {
    res.render('create');
});

router.get('/:postId', function(req, res, next) {
    res.send(req.flash());
});

router.post('/:postId/edit', checkLogin, function(req, res, next) {
    res.send(req.flash());
});

router.get('/:postId/remove', checkLogin, function(req, res, next) {
    res.send(req.flash());
});

router.post('/:postId/comment', checkLogin, function(req, res, next) {
    res.send(req.flash());
});

router.get('/:postId/comment/:commentId/remove', checkLogin, function(req, res, next) {
    res.send(req.flash());
});

module.exports = router;