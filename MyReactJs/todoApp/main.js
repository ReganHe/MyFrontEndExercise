'use strict'

var React = require('react');
var TodoList = require('./components/TodoList');

var TodoApp = React.createClass({
    getInitialState: function () {
        return {
            todos: []
        }
    },
    componentDidMount: function () {
        var todos = [
            {id: 1, content: "todo1"},
            {id: 2, content: "todo2"},
            {id: 3, content: "todo3"}
        ];
        this.setState({
            todos: todos
        });
    },
    render: function () {
        return (
            <div>
                <input type="text" ref="todo"/>
                <button onclick={this.addTodo}>add</button>
                <h2>Todos:</h2>
                <TodoList items={this.state.todos}/>
            </div>
        );
    }
});

React.render(<TodoApp/>, document.getElementById('example'));