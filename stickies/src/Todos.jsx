import Loading from './Loading';
import TodoItem from './TodoItem';

import './Todos.css';

function Todos({ stickieId, todos, isTodoPending, lastAddedTodoId, onDeleteTodo, onToggleTodo }) {

    const SHOW = {
        PENDING: 'pending',
        EMPTY: 'empty',
        TODOS: 'todos',
    };

    let show;
    if (isTodoPending) {
        show = SHOW.PENDING;
    } else if (!Object.keys(todos).length) {
        show = SHOW.EMPTY;
    } else {
        show = SHOW.TODOS;
    }

    return (
        <>
            {show === SHOW.PENDING && <Loading className="todos__waiting">Loading Todos...</Loading>}
            {show === SHOW.EMPTY && (
                <p className="todos__empty-message">No Todo Items yet, add one!</p>
            )}
            {show === SHOW.TODOS && (
                <ul className="todos__list">
                    {Object.values(todos).map(
                        todo => (
                            <li className="todos__item" key={todo.id}>
                                <TodoItem
                                    todo={todo}
                                    isLastAdded={lastAddedTodoId === todo.id}
                                    onDeleteTodo={onDeleteTodo}
                                    onToggleTodo={onToggleTodo}
                                    stickieId={stickieId}
                                />
                            </li>
                        )
                    )}
                </ul>
            )}
        </>

    )
}

export default Todos;