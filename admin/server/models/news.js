var mysqlDB = require("./mysqlDB.js");
var sql = null;
module.exports = {
    /**
     * 腾讯新闻保存
     * @param data
     * @param callback
     */
    saeveNews: function (data, callback) {
        mysqlDB.insertTable(data, callback);
    },
    /**
     * 获取腾讯新闻列表
     * @param callback
     */
    getNew: function (callback) {
        sql = "select * from news";
        mysqlDB.getTableAllInfo({sql: sql}, callback);
    },
    /**
     * 获取腾讯新闻列表
     * @param callback
     */
    getNews: function (p, limit, callback) {
        sql = "select * from news limit " + p + "," + limit;
        mysqlDB.getTableAllInfo({sql: sql}, callback);
    },
    /**
     * 获取新闻总数
     * @param callback
     */
    getNewsCount: function (callback) {
        sql = 'select count(1) count from news';
        mysqlDB.getTableAllInfo({sql: sql}, callback);
    },
    /***
     * 删除某条新闻
     * @param data
     * @param callback
     */
    deleteNew: function (data, callback) {
        mysqlDB.deleteTable(data, callback);
    }
};
