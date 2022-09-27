import type { Note } from '../helpers/types';

type Props = {
  note: Partial<Note>;
  onClose: VoidFunction;
  onChange: (field: string, value: string) => void;
  onSave: VoidFunction;
};

function NoteModal({ note, onClose, onChange, onSave }: Props) {
  return (
    <section
      style={{
        width: '100%',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className="nes-dialog is-rounded"
      id="dialog-rounded"
    >
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(0,0,0,0.2)',
          width: '100%',
          height: '100%',
        }}
      />
      <form
        method="dialog"
        style={{
          backgroundColor: 'white',
          zIndex: '1',
          padding: '20px',
          textAlign: 'left',
          border: '5px solid black',
        }}
      >
        <h1 className="title">Create / edit note</h1>
        <div className="nes-field">
          <label htmlFor="title">Title</label>
          <input
            value={note.title}
            type="text"
            id="title"
            className="nes-input"
            onChange={(event) => onChange('title', event.target.value)}
          />
        </div>

        <label htmlFor="content">Content</label>
        <textarea
          value={note.content}
          id="content"
          className="nes-textarea"
          onChange={(event) => onChange('content', event.target.value)}
        ></textarea>

        <menu
          className="dialog-menu"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0px',
          }}
        >
          <button className="nes-btn" onClick={onClose}>
            Close
          </button>
          <button className="nes-btn is-primary" onClick={onSave}>
            Save
          </button>
        </menu>
      </form>
    </section>
  );
}

export { NoteModal };
