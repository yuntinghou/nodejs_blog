module.exports = {
    checkLogin: function (req, res, next) {
        if (!req.session.user) {
            req.flash('error', "Haven't login yet");
            return res.redirect('/signin');
        }
        next();
    },
    checkNotLogin: function(req, res, next) {
        if (req.session.user) {
            req.flash('error', 'Have logged in');
            return res.redirect('back');
        }
        next();
    }
};