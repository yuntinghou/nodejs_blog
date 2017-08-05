/**
 * Created by HYT on 8/4/2017.
 */
var User = require('../lib/mongo').User;
module.exports = {
    create: function(user) {
        return User.create(user).exec();
    },
    getUserByName: function(name) {
        return User
            .findOne({name: name})
            .addCreatedAt()
            .exec();
    }
};