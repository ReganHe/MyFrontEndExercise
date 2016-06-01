'use strict';

/**
 * Created by heke on 2016/5/31.
 */
require('babel-polyfill');
var sleep = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(timeout) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        return _context.abrupt('return', new Promise(function (resolve, reject) {
                            setTimeout(function () {
                                resolve();
                            }, timeout);
                        }));

                    case 1:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function sleep(_x) {
        return ref.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

_asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    console.log('Do some thing, ' + new Date());
                    _context2.next = 3;
                    return sleep(3000);

                case 3:
                    console.log('Do other things, ' + new Date());

                case 4:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _callee2, this);
}))();
