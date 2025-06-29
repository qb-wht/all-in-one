import type {Project} from '@/shared/api';
import type {PartialWithoutKeys} from '@/shared/types';

export interface ProjectsState {
  projects: Project[];
  changeProjects: (value: Project[]) => void;
}

export interface CreateProjectDataPublic extends PartialWithoutKeys<Project, 'name'> {}

export interface CreateProjectDataPrivate extends PartialWithoutKeys<Project, 'name' | 'type'> {}
