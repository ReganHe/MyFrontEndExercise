/**
 * Created by heke on 2016/6/1.
 */

/*
 * GET articles API.
 */

async function list() {
    var mongoskin = require('mongoskin');
    var dbUrl = process.env.MONGOHQ_URL || 'mongodb://@localhost:27017/blog';
    var db = mongoskin.db(dbUrl, {safe: true});
    var collections = {
        articles: db.collection('articles')
    };
    return new Promise((resolve, reject) => {
            collections.articles.find({}, {sort: {_id: -1}}).toArray(function (error, articles) {
            if (error) {
                reject(error);
            }

            resolve(articles);
        });
})
    ;
};

(async function () {
    console.log('BeginQuery, ' + new Date());
    var articles = await list();
    for (var article of articles) {
        console.log('article name is ' + article.title)
    }
    console.log('EndQuery, ' + new Date());
})();
