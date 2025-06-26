import {useEffect, useState} from 'react';
import {useProjectsStore} from '../model';
import {createProject, subscribeOnProjectsChanges} from '../api';

export const ProjectPicker = () => {
  const {projects} = useProjectsStore((state) => state);

  useEffect(() => {
    const unsubscribe = subscribeOnProjectsChanges();
    return unsubscribe;
  }, []);

  const [title, setTitle] = useState('');

  const handleAdd = async () => {
    await createProject(title);
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
