/**
 * Created by heke on 2016/6/1.
 */

/*
 * GET articles API.
 */

var list = function (callback) {
    var mongoskin = require('mongoskin'),
        dbUrl = process.env.MONGOHQ_URL || 'mongodb://@localhost:27017/blog',
        db = mongoskin.db(dbUrl, {safe: true}),
        collections = {
            articles: db.collection('articles')
        };
    collections.articles.find({}, {sort: {_id: -1}}).toArray(function (error, articles) {
        if (error) return next(error);
        callback(articles);
    });
};

list(function (articles) {
    console.log('BeginQuery, ' + new Date());
    for (var i = 0; i < articles.length; i++) {
        console.log('article name is ' + articles[i].title)
    }
    console.log('EndQuery, ' + new Date());
});
