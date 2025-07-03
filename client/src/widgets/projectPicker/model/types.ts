import type {Project} from '@/shared/api';

export interface ProjectsState {
  projects: Project[];
  changeProjects: (value: Project[]) => void;
}
