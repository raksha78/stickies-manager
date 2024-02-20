import { useState } from 'react';

function Notes({ className, notes, stickieId, onUpdateNotes }) {
    const [noteContent, setNoteContent] = useState(notes);

    function autosave(e) {
        setNoteContent(e.target.value)
        onUpdateNotes(stickieId, e.target.value);
    }

    return (
        <>
            <textarea id="note" className={className} value={noteContent} onChange={autosave}>
                {noteContent}
            </textarea>
        </>
    )
}

export default Notes;