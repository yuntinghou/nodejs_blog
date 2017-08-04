module.exports = {
    port:3000,
    session: {
        secret: 'cxhounodeblog',
        key: 'cxhounodeblog',
        maxAge: 2592000000
    },
    db: 'cxhoublog',
    mongodb: 'mongodb://localhost:27107/cxhoublog'
};