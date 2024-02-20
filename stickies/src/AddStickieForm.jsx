import { useState, useRef } from "react";

function AddStickieForm({ onAddStickie }) {
  const defaultColour = 'green';
  const defaultType = 'todos';
  const [title, setTitle] = useState('');
  const dialogRef = useRef();
  const [colour, setColour] = useState(defaultColour);
  const [type, setType] = useState(defaultType);
  const [err, setErr] = useState('');

  function onTyping(e) {
    setTitle(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();

    if (!title) {
      return setErr('Please enter title for the stickie');
    }

    onAddStickie(title, colour, type);
    setTitle('');
    setColour(defaultColour);
    setErr('');
    dialogRef.current.close();
  }

  function showModal() {
    dialogRef.current.showModal()
  }

  function setStickieColour(e) {
    setColour(e.target.value);
  }

  function setStickieType(e) {
    setType(e.target.value)
  }

  return (
    <>
      <button onClick={showModal} className="add-stickie__button">
        <span className="add-stickie__button-text">Add Stickie</span>
        <i className="gg-file-add add-stickie__icon"></i>
      </button>
      <dialog className="add-stickie__dialog" ref={dialogRef}>
        <>
          <i className="gg-close-o dialog__close" aria-label="close dialog"
            onClick={() => dialogRef.current.close()}></i>
          <form className="add-stickie__form" action="#/add" onSubmit={onSubmit}>
            {err && <span className="add-stickie__dialog--error">{err}</span>}
            <div className="add-stickie__form-labels">
              <label className="add-stickie__form-label">
                <span className="add-stickie__form-label-text">Title:</span>
                <input onChange={onTyping} value={title} className="add-stickie__form-input" ></input>
              </label>
              <span className="add-stickie__form-label">Colour: </span>
              <div className="add-stickie__form-colour">
                <label className="add-stickie__form-colour-label">
                  <input
                    type="radio"
                    value="green"
                    checked={colour === "green"}
                    onChange={setStickieColour}
                    className="add-stickie__form-radio"
                  />
                  <div className="green"></div>
                </label>
                <label className="add-stickie__form-colour-label">
                  <input
                    type="radio"
                    value="pink"
                    checked={colour === "pink"}
                    onChange={setStickieColour}
                    className="add-stickie__form-radio"
                  />
                  <div className="pink"></div>
                </label>
                <label className="add-stickie__form-colour-label">
                  <input
                    type="radio"
                    value="purple"
                    checked={colour === "purple"}
                    onChange={setStickieColour}
                    className="add-stickie__form-radio"
                  />
                  <div className="purple"></div>

                </label>
                <label className="add-stickie__form-colour-label">
                  <input
                    type="radio"
                    value="brown"
                    checked={colour === "brown"}
                    onChange={setStickieColour}
                    className="add-stickie__form-radio"
                  />
                  <div className="brown"></div>
                </label>
              </div>
              <div className="add-stickie__form-type">
                <span className="add-stickie__form-label">Type: </span>
                <label className="add-stickie__form-label">
                  <input
                    type="radio"
                    value="todos"
                    checked={type === "todos"}
                    onChange={setStickieType}
                    className="add-stickie__form-radio"
                  />
                  <span className="add-stickie__form-radio-text">Todos</span>
                </label>
                <label className="add-stickie__form-label">
                  <input
                    type="radio"
                    value="notes"
                    checked={type === "notes"}
                    onChange={setStickieType}
                    className="add-stickie__form-radio"
                  />
                  <span className="add-stickie__form-radio-text">Notes</span>
                </label>
              </div>

            </div>
            <button type="submit" className="add-stickie__submit-button">Add Stickie</button>
          </form>
        </>
      </dialog>
    </>


  );
}

export default AddStickieForm;
