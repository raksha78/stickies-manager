import Loading from './Loading';
import StickieNote from './StickieNote';
import StickieTodo from './StickieTodo';


import './Stickies.css';

function Stickies({
    isStickiePending,
    stickies,
    onDeleteStickie,
    onDeleteTodo,
    onToggleTodo,
    onAddTodo,
    onUpdateNotes,
    onCloseDialog
}) {

    const SHOW = {
        PENDING: 'pending',
        EMPTY: 'empty',
        STICKIES: 'stickies',
    };

    const TYPE = {
        NOTES: 'notes',
        TODOS: 'todos'
    };


    let show;
    if (isStickiePending) {
        show = SHOW.PENDING;
    } else if (!Object.keys(stickies).length) {
        show = SHOW.EMPTY;
    } else {
        show = SHOW.STICKIES;
    }

    return (
        <div className="stickies">
            {show === SHOW.PENDING && (
                <Loading className="stickies__waiting">Loading Stickies...</Loading>
            )}
            {show === SHOW.EMPTY && (
                <p className="stickies__empty">No Stickies yet, add one!</p>
            )}
            {show === SHOW.STICKIES && (
                <ul className="stickies__list">
                    {Object.values(stickies).map((stickie) => (
                        stickie.type === TYPE.NOTES ? (
                                <StickieNote
                                    stickie={stickie}
                                    key={stickie.id}
                                    onDeleteStickie={onDeleteStickie}
                                    onUpdateNotes={onUpdateNotes}
                                    onCloseDialog={onCloseDialog}
                                />
                            ) : (
                                <StickieTodo
                                    stickie={stickie}
                                    key={stickie.id}
                                    onDeleteStickie={onDeleteStickie}
                                    onDeleteTodo={onDeleteTodo}
                                    onToggleTodo={onToggleTodo}
                                    onAddTodo={onAddTodo}
                                />
                            )
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Stickies;