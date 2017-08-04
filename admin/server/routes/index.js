var user = require("../action/user.js");
var news = require("../action/news.js");



module.exports = function (app) {
    /**
     * 重定向首页
     */
    app.get('/', function (req, res, next) {
        res.render('index');
    });

    user(app);
    news(app);
};