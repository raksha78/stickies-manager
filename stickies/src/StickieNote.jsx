import { useRef, useState } from "react";
import Notes from "./Notes";

function StickieNote({ stickie, onDeleteStickie, onUpdateNotes, onCloseDialog }) {
    const dialogRef = useRef();
    const [content, setContent] = useState('');

    function showModal() {
        dialogRef.current.showModal()
    }
    function onChange() {
        setContent('saved');
    }
    return (
        <>
            <li key={stickie.id} onClick={showModal} className={`stickies__item ${stickie.colour}Note`}>
                <div className="stickies__delete">
                    <i className="gg-trash stickies__delete-button"
                        data-id={stickie.id}
                        onClick={(e) => {
                            const id = e.target.dataset.id;
                            onDeleteStickie(id);
                        }}></i>
                    <span className="stickies__title">{stickie.title}</span>
                </div>
                <Notes
                    className="stickie__note"
                    notes={stickie.notes}
                    onUpdateNotes={onUpdateNotes}
                    stickieId={stickie.id}
                    onCloseDialog={onCloseDialog}
                />
            </li>
            <dialog ref={dialogRef}>
                <div className="dialog__notes" onChange={onChange}>
                {content && <span className="dialog__saved">{content}</span>}
                    <div className="dialog__icons">
                        <i className="gg-trash stickies__delete-button"
                            data-id={stickie.id}
                            onClick={(e) => {
                                const id = e.target.dataset.id;
                                onDeleteStickie(id);
                            }}></i>
                        <i aria-label="close dialog" className="gg-close-o dialog__close" onClick={() => {
                            dialogRef.current.close();
                            onCloseDialog();
                        }}></i>
                    </div>
                    <span className="stickies__title">{stickie.title}</span>
                    <Notes
                        className="dialog__note"
                        notes={stickie.notes}
                        onUpdateNotes={onUpdateNotes}
                        stickieId={stickie.id}
                        onCloseDialog={onCloseDialog}
                    />
                </div>

            </dialog>
        </>
    )
}

export default StickieNote;