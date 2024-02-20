import { useState } from "react";

function AddTodoForm({ stickieId, onAddTodo }) {

    const [task, setTask] = useState('');

    function onSubmit(e) {
        e.preventDefault();
        setTask('');
        onAddTodo(stickieId, task);
    }

    function onTyping(e) {
        setTask(e.target.value);
    }

    return (
        <form className="form__add-todo" onSubmit={onSubmit} action="#/add">
            <input className="form__add-todo-input" onChange={onTyping} value={task} />
            <button className="form__add-todo-button" type="submit">Add</button>
        </form>
    )
}

export default AddTodoForm;