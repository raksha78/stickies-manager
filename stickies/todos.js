const uuid = require('uuid').v4;

function makeTodoList() {
    const id1 = uuid();
    const id2 = uuid();

    const todoList = {};
    const todos = {
        [id1]: {
            id: id1,
            task: 'nap',
            done: false
        },
        [id2]: {
            id: id2,
            task: 'study',
            done: true
        },
    }

    todoList.contains = function contains(id) {
        return !!todos[id];
    }

    todoList.getTodos = function getTodos() {
        return todos;
    }

    todoList.addTodo = function addTodo(task) {
        const id = uuid();
        todos[id] = {
            id,
            task,
            done: false
        };

        return id;
    }

    todoList.deleteTodo = function deleteTodo(id) {
        delete todos[id];
    }

    todoList.updateTodo = function updateTodo(id, todo) {
        todos[id].done = todo.done ?? todos[id].done;
        todos[id].task = todo.task || todos[id].task;
    }

    todoList.getTodo = function getTodo(id) {
        return todos[id];
    }

    return todoList;

}

module.exports = {
    makeTodoList
}