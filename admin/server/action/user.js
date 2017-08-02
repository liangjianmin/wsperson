var user = require("../models/user.js");
var moment = require('moment');
var crypto = require('crypto');


module.exports = function (app) {
    /**
     * 删除用户
     */
    app.post('/deleteUsers', function (req, res, next) {
        user.deleteUsers({
            sql: "DELETE FROM user WHERE id = " + req.body.id
        }, function (data) {
            res.send(data);
        });
    });
    /**
     * 登录session设置
     */
    app.post('/login', function (req, res, next) {
        var loginflag = true;
        user.getUsers(function (data) {
            if (data.status) {
                var md5 = crypto.createHash('md5');
                md5.update(req.body.password.toString());
                var ispwd = md5.digest('hex');
                for (let i = 0; i < data.data.length; i++) {
                    if (req.body.username == data.data[i].username && ispwd == data.data[i].password) {
                        /*发送session*/
                        req.session.user = req.body.username;
                        res.send({status: true});
                        loginflag = false;
                        break;
                    }
                }
                if (loginflag) {
                    res.send({status: false});
                }
            }
            res.end();
        })
    });
    /**
     * 获取session
     */
    app.post('/session', function (req, res, next) {
        user.getUsers(function (data) {
            if (req.session.user != undefined) {
                for (let i = 0; i < data.data.length; i++) {
                    if (req.session.user == data.data[i].username) {
                        res.send({session: req.session.user, status: true, role: data.data[i].role});
                        break;
                    }
                }
            } else {
                res.send({status: false});
            }
        })
    });
    /**
     * 清除session退出系统
     */
    app.post('/exit', function (req, res, next) {
        req.session.user = '';
        res.send({session: req.session.user, status: false});
        res.end();
    });
    /**
     * 注册并且判断用户是否已经注册
     */
    app.post('/addUsers', function (req, res, next) {
        var userfalg = true;
        user.getUsers(function (data) {
            if (data.status) {
                for (let i = 0; i < data.data.length; i++) {
                    if (req.body.username == data.data[i].username) {
                        res.send({data: req.body.username, isOwn: true});
                        userfalg = false;
                        break;
                    }
                }
            }
            if (userfalg) {
                /*加密密码*/
                var md5 = crypto.createHash('md5');
                md5.update(req.body.password.toString());
                var pwd = md5.digest('hex');
                user.addUsers({
                    data: {
                        username: req.body.username,
                        password: pwd,
                        sex: req.body.sex,
                        role: req.body.role,
                        time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
                    },
                    sql: "INSERT INTO user SET ?"
                }, function (data) {
                    res.send(data);
                });
            }
        })
    });
    /**
     * 获取用户
     */
    app.get('/page', function (req, res) {
        user.getUsers(function (data) {
            if (data.status) {
                res.send(data);
            } else {
                res.send(500);
            }
        });
    });
    /**
     * 获取用户分页显示
     */
    app.get('/pages', function (req, res) {
        var p = req.query.p;
        var limit = 10;
        var count;
        var totalPages;
        user.getTableCount(function (data) {
            if (data) {
                count = data.data[0].count;
                totalPages = Math.ceil(data.data[0].count / limit);
            }
            user.getUserpage((p - 1) * limit, limit, function (data) {
                if (data.status) {
                    res.send({list: data, maxPage: totalPages, currage: p, count: count, limit: limit});
                } else {
                    res.send(500);
                }
            });
        });

    });
};
