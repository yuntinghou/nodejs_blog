/**
 * Created by HYT on 8/5/2017.
 */
var Post = require('../lib/mongo').Post;
var marked = require('marked');

Post.plugin('contentToHtml', {
    afterFind: function(posts) {
        return posts.map(function(post) {
            post.content = marked(post.content);
            return post;
        });
    },
    afterFindOne: function(post) {
        if (post) {
            post.content = marked(post.content);
        }
        return post;
    }
});

module.exports = {
    create: function(post) {
        return Post.create(post).exec();
    },
    getPostById: function(postId) {
        return Post
            .findOne({_id : postId})
            .populate({path:'author', model: 'User'})
            .addCreatedAt()
            .contentToHtml()
            .exec();
    },
    getPosts: function(author) {
        var query = {};
        if (author) {
            query.author = author;
        }
        return Post
            .find(query)
            .populate({path: 'author', model: 'User'})
            .sort({_id: -1})
            .addCreatedAt()
            .contentToHtml()
            .exec();
    },
    incPv: function(postId) {
        return Post
            .update({_id: postId}, {$inc: {pv : 1} })
            .exec();
    }
};

