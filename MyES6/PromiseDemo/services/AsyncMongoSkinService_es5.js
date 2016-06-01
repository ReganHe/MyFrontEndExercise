'use strict';

/**
 * Created by heke on 2016/6/1.
 */

/*
 * GET articles API.
 */
require('babel-polyfill');
var list = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var mongoskin, dbUrl, db, collections;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        mongoskin = require('mongoskin');
                        dbUrl = process.env.MONGOHQ_URL || 'mongodb://@localhost:27017/blog';
                        db = mongoskin.db(dbUrl, { safe: true });
                        collections = {
                            articles: db.collection('articles')
                        };
                        return _context.abrupt('return', new Promise(function (resolve, reject) {
                            collections.articles.find({}, { sort: { _id: -1 } }).toArray(function (error, articles) {
                                if (error) {
                                    reject(error);
                                }

                                resolve(articles);
                            });
                        }));

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function list() {
        return ref.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

;

_asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var articles, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, article;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    console.log('BeginQuery, ' + new Date());
                    _context2.next = 3;
                    return list();

                case 3:
                    articles = _context2.sent;
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context2.prev = 7;

                    for (_iterator = articles[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        article = _step.value;

                        console.log('article name is ' + article.title);
                    }
                    _context2.next = 15;
                    break;

                case 11:
                    _context2.prev = 11;
                    _context2.t0 = _context2['catch'](7);
                    _didIteratorError = true;
                    _iteratorError = _context2.t0;

                case 15:
                    _context2.prev = 15;
                    _context2.prev = 16;

                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }

                case 18:
                    _context2.prev = 18;

                    if (!_didIteratorError) {
                        _context2.next = 21;
                        break;
                    }

                    throw _iteratorError;

                case 21:
                    return _context2.finish(18);

                case 22:
                    return _context2.finish(15);

                case 23:
                    console.log('EndQuery, ' + new Date());

                case 24:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _callee2, this, [[7, 11, 15, 23], [16,, 18, 22]]);
}))();
