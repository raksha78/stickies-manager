import { useRef, useState } from "react";
import Todos from "./Todos";
import AddTodoForm from "./AddTodoForm";

function StickieTodo({ stickie, onDeleteStickie, onDeleteTodo, onToggleTodo, onAddTodo }) {
    const [content, setContent] = useState('');
    const dialogRef = useRef();

    function showModal() {
        dialogRef.current.showModal()
    }
    function onSubmit() {
        setContent('saved');
    }
    function onChange() {
        setContent('');
    }
    return (
        <>
            <li key={stickie.id} onClick={showModal} className={`stickies__item ${stickie.colour}Note`}>
                <div className="stickies__delete">
                    <i className="gg-trash stickies__delete-button" data-id={stickie.id}
                        onClick={(e) => {
                            const id = e.target.dataset.id;
                            onDeleteStickie(id);
                        }}></i>
                    <span className="stickies__title">{stickie.title}</span>
                </div>
                <Todos
                    todos={stickie.todos}
                    stickieId={stickie.id}
                />
            </li>
            <dialog className="dialog" ref={dialogRef}>
                <div className="dialog__notes" onSubmit={onSubmit} onChange={onChange}>
                    {content && <span className="dialog__saved">{content}</span>}
                    <div className="dialog__icons">
                        <i aria-label="close dialog" className="gg-close-o dialog__close" onClick={() => dialogRef.current.close()}></i>
                        <i className="gg-trash stickies__delete-button" data-id={stickie.id}
                        onClick={(e) => {
                            const id = e.target.dataset.id;
                            onDeleteStickie(id);
                        }}></i>
                    </div>
                    <span className="stickies__title">{stickie.title}</span>
                    <Todos
                        todos={stickie.todos}
                        onDeleteTodo={onDeleteTodo}
                        onToggleTodo={onToggleTodo}
                        stickieId={stickie.id}
                    />
                    <AddTodoForm stickieId={stickie.id} onAddTodo={onAddTodo} />
                </div>
                
            </dialog>
        </>
    )
}

export default StickieTodo;