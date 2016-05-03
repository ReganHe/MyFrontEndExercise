var Promise = require('es6-promise').Promise;
var assign = require('object-assign');

var _callbacks = [];
var _promises = [];

var Dispatcher = function () {
};
Dispatcher.prototype = assign({}, Dispatcher.prototype, {
    /*
     * 注册函数
     * 注册一个Store的回调函数,这样它就可以在一个action发生时被调用
     * @param {function} callback需要注册的回调函数
     * @return {number} 该回调函数在_callback数组中的索引
     */
    register: function (callback) {
        _callbacks.push(callback);
        return _callbacks.length - 1;//index
    },
    /*
     * 派发函数
     * @param {object} payload 从action拿到的数据
     */
    dispactch: function (payload) {
        //首先创建引用回调函数的promise数组
        var resolves = [];
        var rejects = [];
        _promises = _callbacks.map(function (_, i) {
            return new Promise(function (resolve, reject) {
                resolves[i] = resolve;
                rejects[i] = reject;
            });
        });
        //派发给回调函数并处理promise
        _callbacks.forEach(function (callback, i) {
            //回调可能返回一个obj对象或者promise
            //可以参考waitFor(),来理解为什么这么做可能有用.
            Promise.resolve(callback(payload)).then(function () {
                resolves[i](payload);
            }, function () {
                rejects[i](new Error('Dispatch callback unsuccessful'));
            });
        });

        _promises = [];
    }
});

module.exports = Dispatcher;
