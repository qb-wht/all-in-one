import type {Project} from '@/shared/api';
import {db} from '@/shared/api/db';
import {useProjectsStore} from '../model';
import type {CreateProjectDataPrivate, CreateProjectDataPublic} from '../model/types';

export const createProject = async (
  data: CreateProjectDataPublic,
): Promise<PouchDB.Core.Response> => {
  const projectData: CreateProjectDataPrivate = {
    ...data,
    type: 'project',
    fileCount: 0,
    fileIds: [],
  };

  // _id и _rev не обязательно указывать, bd создает их сама
  const res = await db.post(projectData as Project);

  return res;
};

export const changeProject = async (project: Project): Promise<PouchDB.Core.Response> => {
  const res = await db.put(project);

  return res;
};

export const getProject = async (id: string): Promise<Project> => {
  const data = await db.get<Project>(id);

  return data;
};

export const removeProject = async (project: Project): Promise<PouchDB.Core.Response> => {
  const res = await db.remove(project);

  return res;
};

export const getProjects = async () => {
  const res = await db.find({
    selector: {type: 'project'},
  });

  // TODO: FIX
  useProjectsStore.getState().changeProjects(res.docs as Project[]);
};

// TODO: FIX
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
