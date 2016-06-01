'use strict'

var React = require('react');
var TodoList = require('./components/TodoList');
var TodoStoreActions = require('./actions/TodoStoreActions');
var TodoStore = require('./store/TodoStore');

function getAppState() {
    return {
        todos: TodoStore.getTodos()
    };
}

var TodoApp = React.createClass({
    getInitialState: function () {
        TodoStoreActions.loadTodos();
        return getAppState();
    },
    componentDidMount: function () {
        TodoStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        TodoStore.removeChangeListener(this._onChange);
    },
    addTodo: function () {
        TodoStoreActions.addTodo({
            id: this.state.todos.length + 1,
            content: this.refs.todo.getDOMNode().value
        });
    },
    render: function () {
        return (
            <div>
                <input type="text" ref="todo"/>
                <button onClick={this.addTodo}>add</button>
                <h2>Todos:</h2>
                <TodoList items={this.state.todos}/>
            </div>
        );
    },
    _onChange: function () {
        this.setState(getAppState());
    }
});

React.render(<TodoApp/>, document.getElementById('example'));