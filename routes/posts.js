var express = require('express');
var router = express.Router();
var PostModel = require('../models/posts');
var CommentModel = require('../models/comments');

var checkLogin = require('../middlewares/check').checkLogin;
router.get('/', function(req, res, next) {
    var author = req.query.author;
    PostModel.getPosts(author)
        .then(function(posts) {
            res.render('posts', {
                posts: posts
            })
        })
        .catch(next);
});

router.post('/',checkLogin, function(req, res, next) {
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
            req.flash('success', 'Successfully posted');
            res.redirect('/posts/'+post._id);
        })
        .catch(next);
});

router.get('/create', checkLogin, function(req, res, next) {
    res.render('create');
});

router.get('/:postId', function(req, res, next) {
    var postId = req.params.postId;
    Promise
        .all([
            PostModel.getPostById(postId),
            CommentModel.getComments(postId),
            PostModel.incPv(postId)
        ])
        .then (function(result) {
            var post = result[0];
            var comments = result[1];
            if (!post) {
                throw new Error("This article does not exist");
            }
            res.render('post', {
                post: post,
                comments: comments
            })
        });
});

router.get('/:postId/edit', checkLogin, function(req, res, next) {
    var postId = req.params.postId;
    var author = req.session.user._id;

    PostModel.getRawPostById(postId)
        .then(function(post) {
            if (!post) {
                throw new Error('The article doesn\'t exist');
            }
            if (author.toString() !== post.author.toString()) {
                throw new Error('No permission');
            }
            res.render('edit', {
                post:post
            });
        })
        .catch(next);
});

router.post('/:postId/edit', checkLogin, function(req, res, next) {
    var postId = req.params.postId;
    var author = req.session.user._id;
    var title = req.fields.title;
    var content = req.fields.content;

    PostModel.updatePostById(postId, author, {title: title, content: content})
        .then(function() {
            req.flash('success', 'Article is edited');
            res.redirect('/posts/' + postId);
        })
        .catch(next);
});

router.get('/:postId/remove', checkLogin, function(req, res, next) {
    var postId = req.params.postId;
    var author = req.session.user._id;

    PostModel.delPostById(postId, author)
        .then(function() {
            req.flash('success', 'Article is deleted');
            res.redirect('/posts');
        })
        .catch(next);
});

router.post('/:postId/comment', checkLogin, function(req, res, next) {
    var author = req.session.user._id;
    var postId = req.params.postId;
    var content = req.fields.content;
    var comment = {
        author:author,
        postId: postId,
        content: content
    };

    CommentModel.create(comment)
        .then(function() {
            req.flash('success', 'Added a comment');
            res.redirect('back');
        })
        .catch(next);
});

router.get('/:postId/comment/:commentId/remove', checkLogin, function(req, res, next) {
    res.send(req.flash());
});

module.exports = router;