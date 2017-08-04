module.exports = {
    port: 3000,
    session:{
        secret: 'cxhounodeblog',
        key: 'cxhounodeblog',
        maxAge: 2592000000
    },
    db: 'cxhoublog',
    mongodb: 'mongodb://localhost/cxhoublog'
    //mongodb: 'mongodb://cxhou:hou1234@ds034807.mlab.com:34807/mygame'
};