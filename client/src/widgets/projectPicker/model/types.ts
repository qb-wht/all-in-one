export interface Project {
  _id: string;
  _rev?: string;
  title: string;
}

export interface ProjectState {
  projects: Project[];
  changeProjects: (value: Project[]) => void;
}
