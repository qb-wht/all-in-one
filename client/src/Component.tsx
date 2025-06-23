import {useEffect, useState} from 'react';
import {db} from './db';

type Note = {
  _id: string;
  _rev?: string;
  title: string;
};

export const Component = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const loadNotes = async () => {
      const result = await db.allDocs<Note>({include_docs: true});
      setNotes(result.rows.map((r) => r.doc!) as Note[]);
    };

    loadNotes();

    const changes = db
      .changes({
        since: 'now',
        live: true,
        include_docs: true,
      })
      .on('change', () => loadNotes());

    return () => changes.cancel();
  }, []);

  const [title, setTitle] = useState('');

  const handleAdd = async () => {
    if (!title.trim()) return;

    await db.post({title});
    setTitle('');
  };

  return (
    <div>
      <ul>
        {notes.map((note) => (
          <li key={note._id}>{note.title}</li>
        ))}
      </ul>

      <div>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <button onClick={handleAdd}>Добавить</button>
      </div>
    </div>
  );
};
