import {projectService, type CreateProjectDataPublic, type Project} from '@/shared/api';

export const createProject = async (data: CreateProjectDataPublic) => {
  return projectService.create(data);
};

export const updateProject = async (project: Project) => {
  return projectService.update(project);
};

export const getProject = async (id: string): Promise<Project> => {
  return projectService.get(id);
};

export const removeProject = async (project: Project) => {
  return projectService.remove(project);
};

export const getProjects = async (): Promise<Project[]> => {
  const projects = await projectService.getAll();

  return projects;
};
