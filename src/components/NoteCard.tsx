import { Note } from '../helpers/types';
import './NoteCard.css';
import archiveImg from '../../public/assets/archive.png';
import deleteImg from '../../public/assets/delete.png';
import editImg from '../../public/assets/edit.png';

type Props = {
  note: Note;
  onArchive: (id: Note['id']) => void;
  onDelete: (id: Note['id']) => void;
  onEdit: (note: Note) => void;
};

function NoteCard({ note, onArchive, onDelete, onEdit }: Props) {
  return (
    <div className="nes-container is-rounded" style={{ margin: '20px' }}>
      <div className="CardElementsLeft">
        <h3>{note.title}</h3>
        <h4>{note.content}</h4>
        <h6>Last Edited: {note.lastEdited}</h6>
      </div>
      <div className="CardElementsRight">
        <img src={archiveImg} onClick={() => onArchive(note.id)} />
        <img src={editImg} onClick={() => onEdit(note)} />
        <img src={deleteImg} onClick={() => onDelete(note.id)} />
      </div>
    </div>
  );
}

export { NoteCard };
