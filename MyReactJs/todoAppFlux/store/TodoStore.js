'use strict'

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

//todos数组对象
var _todos = [];

//从data actions中加载todos数据的方法
function loadTodos(todos) {
    _todos = data.todos;
}

//使用Node的Event Emitter来合并我们的store数据
var TodoStore = assign({}, EventEmitter.prototype, {
    //返回所有的todos数据
    getTodos: function () {
        return _todos;
    },
    emitChange: function () {
        this.emit('change');
    },
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    }
});

//注册dispatcher的回调函数
AppDispatcher.register(function (payload) {
    var action = payload.action;
    //定义不同action的执行逻辑
    switch (action) {
        case 'LOAD_TODOS':
            //根据分发的action来调用方法
            loadTodos(action.data);
            break;
        default:
            return true;
    }

    //如果action已经生效,发布change事件
    TodoStore.emitChange();
    return true;
});

module.exports = TodoStore;
