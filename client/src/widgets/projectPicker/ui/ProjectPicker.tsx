import {useEffect, useState} from 'react';
import {db} from '@/shared/api';
import {useProjectStateStore, type Project} from '../model';

export const ProjectPicker = () => {
  const {projects, changeProjects} = useProjectStateStore((state) => state);

  useEffect(() => {
    const loadProjects = async () => {
      const result = await db.allDocs<Project>({include_docs: true});
      changeProjects(result.rows.map((r) => r.doc!) as Project[]);
    };

    loadProjects();

    const changes = db
      .changes({
        since: 'now',
        live: true,
        include_docs: true,
      })
      .on('change', () => loadProjects());

    return () => changes.cancel();
  }, [changeProjects]);

  const [title, setTitle] = useState('');

  const handleAdd = async () => {
    if (!title.trim()) return;

    await db.post({title});
    setTitle('');
  };

  return (
    <div>
      <ul>
        {projects.map((note) => (
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
