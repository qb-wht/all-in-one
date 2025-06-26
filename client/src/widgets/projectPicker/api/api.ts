import {db} from '@/shared/api/db';
import {useProjectsStore, type Project} from '../model';

export const createProject = async (title: string) => {
  if (!title.trim()) return;

  await db.post({title});
};

export const getProjects = async () => {
  const result = await db.allDocs({include_docs: true});
  const projects = result.rows.map((r) => r.doc!).filter(Boolean) as Project[];

  useProjectsStore.getState().changeProjects(projects);
};

export const subscribeOnProjectsChanges = () => {
  getProjects();

  const changes = db
    .changes({
      since: 'now',
      live: true,
      include_docs: true,
    })
    .on('change', getProjects);

  return () => changes.cancel();
};
