const uuid = require('uuid').v4;

function makeStickieList() {
    const id1 = uuid();
    const id2 = uuid();

    const todos = {
        [id2]: {
            id: id2,
            task: 'study',
            done: false
        }
    }

    const stickieList = {};

    const stickies = {
        [id1]: {
            id: id1,
            type: 'todos',
            title: 'Default',
            colour: 'green',
            todos
        }
    }

    stickieList.getStickies = function getStickies() {
        return stickies;
    }

    stickieList.addStickie = function addStickie(title, colour, stickieType) {
        const type = stickieType === 'todos' ? 'todos' : 'notes';

        const id = uuid();

        const todos = {}

        const notes = "";

        if (type === 'todos') {
            stickies[id] = {
                id,
                type,
                title,
                colour,
                todos
            };
        }

        if (type === 'notes') {
            stickies[id] = {
                id,
                type,
                title,
                colour,
                notes
            };
        }

        return id;
    }

    stickieList.deleteStickie = function deleteStickie(id) {
        delete stickies[id];
    }

    stickieList.getStickie = function getStickie(id) {
        return stickies[id];
    }

    stickieList.contains = function contains(stickieId) {
        return !!stickies[stickieId];
    }

    stickieList.containsTodo = function containsTodo(stickieId, id) {
        const todos = stickies[stickieId].todos;
        return !!todos[id];
    }

    stickieList.getTodos = function getTodos(stickieId) {
        return stickies[stickieId].todos;
    }

    stickieList.addTodo = function addTodo(stickieId, task) {
        const id = uuid();

        stickies[stickieId] = {
            ...stickies[stickieId],
            todos: {
                ...stickies[stickieId].todos,
                [id]: {
                    id,
                    task,
                    done: false
                }
            }
        }

        return id;
    }

    stickieList.deleteTodo = function deleteTodo(stickieId, id) {
        delete stickies[stickieId].todos[id];
    }

    stickieList.updateTodo = function updateTodo(stickieId, id, todo) {
        stickies[stickieId].todos[id].done = todo.done ?? stickies[stickieId].todos[id].done;
        stickies[stickieId].todos[id].task = todo.task || stickies[stickieId].todos[id].task;
    }

    stickieList.getTodo = function getTodo(stickieId, id) {
        return stickies[stickieId].todos[id];
    }

    stickieList.updateNotes = function updateNotes(stickieId, noteContent) {
        stickies[stickieId] = {
            ...stickies[stickieId],
            notes: noteContent
        }
    }

    return stickieList;

}

module.exports = {
    makeStickieList,
}