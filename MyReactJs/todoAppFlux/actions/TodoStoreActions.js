var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoStoreActions = {
    loadTodos: function () {
        var todos = [
            {id: 1, content: "todo1"},
            {id: 2, content: "todo2"},
            {id: 3, content: "todo3"}
        ];
        AppDispatcher.handleViewAction({
            actionType: 'LOAD_TODOS',
            data: {
                todos: todos
            }
        });
    },
    addTodo:function(todo){
        AppDispatcher.handleViewAction({
            actionType: 'ADD_TODO',
            data: {
                todo: todo
            }
        });
    }
};
module.exports = TodoStoreActions;
