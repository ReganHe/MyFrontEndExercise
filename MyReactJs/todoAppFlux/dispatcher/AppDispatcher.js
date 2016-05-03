var Dispatcher = require('./Dispatcher');
var assign = require('object-assign');

var AppDispatcher = assign({}, AppDispatcher.prototype, {
    handleViewAction: function (action) {
        this.dispactch({
            source: 'VIEW_ACTION',
            action: action
        });
    }
});

module.exports = AppDispatcher;
