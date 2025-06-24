import {create} from 'zustand';
import type {ProjectState} from './types';

export const useProjectStateStore = create<ProjectState>((set) => ({
  projects: [],
  changeProjects: (value) => set(() => ({projects: value})),
}));
