'use strict'

var React = require('react');
var TodoItem = require('./TodoItem');

var TodoList = React.createClass({
    render: function () {
        var todoItems = this.props.items.map(function (item) {
            return <TodoItem item={item} key={item.id}/>
        });
        return (
            <ul>
                {todoItems}
            </ul>
        );
    }
});

module.exports = TodoList;