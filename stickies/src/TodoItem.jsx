function TodoItem({
    stickieId,
    todo,
    isLastAdded,
    onDeleteTodo,
    onToggleTodo,
}) {
    const isDoneClass = todo.done ? "todo__text--complete" : "";
    const isAddedClass = isLastAdded ? "todo__text--added" : "";

    return (
        <>
            <label className="todo__label">
                <input
                    type="checkbox"
                    className="todo__toggle"
                    data-id={todo.id}
                    checked={todo.done}
                    onChange={(e) => {
                        const id = e.target.dataset.id;
                        onToggleTodo(stickieId, id);
                    }}
                />
                <span data-id={todo.id} className={`todo__toggle todo__text ${isDoneClass} ${isAddedClass}`}>
                    {todo.task}
                </span>
            </label>
            <i className="gg-close-r" data-id={todo.id} onClick={(e) => {
                const id = e.target.dataset.id;
                onDeleteTodo(stickieId, id)
            }}></i>
        </>
    )


}

export default TodoItem;