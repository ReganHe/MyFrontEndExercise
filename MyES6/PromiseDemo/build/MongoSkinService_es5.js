'use strict';

/**
 * Created by heke on 2016/6/1.
 */

/*
 * GET articles API.
 */

var list = function list() {
    var mongoskin = require('mongoskin'),
        dbUrl = process.env.MONGOHQ_URL || 'mongodb://@localhost:27017/blog',
        db = mongoskin.db(dbUrl, { safe: true }),
        collections = {
        articles: db.collection('articles')
    };
    collections.articles.find({}, { sort: { _id: -1 } }).toArray(function (error, articles) {
        if (error) return next(error);
        return articles;
    });
};

list();
