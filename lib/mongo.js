/**
 * Created by HYT on 8/4/2017.
 */
var config = require('config-lite')(__dirname);
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');

mongolass.connect(config.mongodb);

mongolass.plugin('addCreatedAt', {
    afterFind: function(results) {
        results.forEach(function (item) {
            item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
        });
        return results;
    },
    afterFindOne: function(result) {
        if (result) {
            result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
        }
        return result;
    }
});

exports.User = mongolass.model('User', {
    name: {type: 'string'},
    password: {type: 'string'},
    avatar: {type: 'string'},
    gender: {type: 'string', enum: ['m', 'f', 'x']},
    bio: {type: 'string'}
});
exports.User.index({ name: 1}, {unique: true}).exec();

exports.Post = mongolass.model('Post', {
    author: {type: Mongolass.Types.ObjectId},
    title: {type: 'string'},
    content: {type: 'string'},
    pv: {type: 'number'}
});
exports.Post.index({author: 1, _id: -1}).exec();

exports.Comment = mongolass.model('Commnet', {
    author: {type: Mongolass.Types.ObjectId},
    content: {type: 'string'},
    postId: {type: Mongolass.Types.ObjectId}
});
exports.Post.index({postId:1, _id:1}).exec();
exports.Post.index({author:1, _id:1}).exec();