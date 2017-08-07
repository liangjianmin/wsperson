var news = require('../models/news');
var moment = require('moment');
var http = require('http');
var fs = require('fs');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');
var request = require('request');
var xml2js = require('xml2js');//解析xml
var xmlParser = new xml2js.Parser({explicitArray: false, ignoreAttrs: true});
var url = "http://news.qq.com/newsgn/rss_newsgn.xml";


module.exports = function (app) {

    /**
     * 保存腾讯国内新闻
     */
    app.get('/news', function (req, res) {
        http.get(url, function (reshttp) {
            var arrBuf = [];
            var bufLength = 0;
            reshttp.on("data", function (chunk) {
                arrBuf.push(chunk);
                bufLength += chunk.length;
            }).on("end", function () {
                var chunkAll = Buffer.concat(arrBuf, bufLength);
                var xmldata = iconv.decode(chunkAll, 'gb2312');
                xmlParser.parseString(xmldata, function (err, result) {
                    // xml转成json格式
                    var jsondata = JSON.stringify(result.rss.channel.item);
                    var parse = JSON.parse(jsondata);

                    // 将数据保存到数据库中
                    news.getNew(function (data) {
                        for (let i = 0; i < parse.length; i++) {
                            news.saeveNews({
                                data: {
                                    title: parse[i].title,
                                    link: parse[i].link,
                                    pubDate: parse[i].pubDate,
                                    description: parse[i].description,
                                    flag: 'qqnews',
                                    time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
                                },
                                sql: "INSERT INTO news SET ?"
                            }, function (data) {
                                if (data.status) {
                                    if (i === parse.length - 1) {
                                        res.send({status: true})
                                    }
                                } else {
                                    if (i === parse.length - 1) {
                                        res.send({status: false})
                                    }
                                }
                            });
                        }
                    })
                });
            });
        })
    })


    /**
     * 获取腾讯国内新闻
     */
    app.get('/getnews', function (req, res) {
        var p = req.query.p;
        var limit = 10;
        var count;
        var totalPages;
        news.getNewsCount(function (data) {
            if (data) {
                count = data.data[0].count;
                totalPages = Math.ceil(data.data[0].count / limit);
            }
            news.getNews((p - 1) * limit, limit, function (data) {
                if (data.status) {
                    res.send({list: data, maxPage: totalPages, currage: p, count: count, limit: limit});
                } else {
                    res.send(500);
                }
            });
        });
    })

    /**
     * 删除新闻
     */
    app.post('/deletenews', function (req, res) {
        news.deleteNew({
            sql: "DELETE FROM news WHERE id = " + req.body.id
        }, function (data) {
            res.send(data);
        });
    });

    /**
     * 获取新闻详情
     */
    app.get('/newsdetails', function (req, res) {
        var id = req.query.id;
        news.getNewDetails(id, function (data) {
            if(data.status){
                res.send(data);
            }
        })
    })
};
