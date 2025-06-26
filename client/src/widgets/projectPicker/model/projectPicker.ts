import {create} from 'zustand';
import type {ProjectsState} from './types';

export const useProjectsStore = create<ProjectsState>((set) => ({
  projects: [],
  changeProjects: (value) => set(() => ({projects: value})),
}));
