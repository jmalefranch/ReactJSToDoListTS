import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { api } from './helpers/api';
import type { Note } from './helpers/types';
import { NoteCard } from './components/NoteCard';
import { NoteModal } from './components/NoteModal';
import moment from 'moment';

function App() {
  const [notes, setNotes] = useState<Note[]>(api.notes.list);
  const [draft, setDraft] = useState<null | Partial<Note>>(null);
  const [view, setView] = useState<'active' | 'archived'>('active');

  //maneja las vistas archivadas o activas
  const matches = useMemo(() => {
    return notes.filter((note) =>
      view === 'active' ? !note.archived : note.archived,
    );
  }, [notes, view]);

  function HandleDelete(id: Note['id']) {
    setNotes((notes) => notes.filter((note) => note.id != id));
  }

  function HandleArchived(id: Note['id']) {
    setNotes((notes) =>
      notes.map((note) => {
        if (note.id != id) return note;

        return {
          ...note,
          archived: !note.archived,
        };
      }),
    );
  }

  function HandleDraftChange(field: string, value: string) {
    setDraft((draft) => ({
      ...draft,
      [field]: value,
    }));
  }

  function HandleEdit(note: Note) {
    setDraft(note);
  }

  function HandleSave() {
    if (draft?.id) {
      setNotes((notes) =>
        notes.map((note) => {
          if (note.id != draft.id) return note;
          return {
            ...draft,
            lastEdited: moment().format('MMM Do YY').toString(), //new Date().toDateString(),
          } as Note;
        }),
      );
    } else {
      setNotes((notes) =>
        notes.concat({
          id: String(+new Date()),
          lastEdited: moment().format('MMM Do YY').toString(),
          ...(draft as Omit<Note, 'id' | 'lastEdited'>),
        }),
      );
    }
    setDraft(null);
  }

  useEffect(() => {
    api.notes.set(notes);
  }, [notes]);

  return (
    <main>
      <div className="Header">
        <h1>My notes</h1>
        <button className="nes-btn" onClick={() => setDraft({ title: '' })}>
          Create Note
        </button>
        <a
          href="#"
          onClick={() =>
            setView((view) => (view === 'active' ? 'archived' : 'active'))
          }
        >
          {view === 'active' ? 'Archived Notes' : 'Active Notes'}
        </a>
      </div>
      <div
        style={{
          display: 'grid',
          gap: 24,
          gridTemplateColumns: 'repeat(auto-fill, minmax(480px) 1fr)',
        }}
      >
        {matches.map((note) => (
          <NoteCard
            onArchive={HandleArchived}
            onDelete={HandleDelete}
            onEdit={HandleEdit}
            key={note.id}
            note={note}
          />
        ))}
      </div>
      {draft && (
        <NoteModal
          note={draft}
          onChange={HandleDraftChange}
          onClose={() => setDraft(null)}
          onSave={HandleSave}
        />
      )}
    </main>
  );
}

export default App;
