import {create} from 'zustand';
import {initialContent} from './constants';

export interface EditorState {
  projectId: string;
  changeProjectId: (value: string) => void;
  content: string;
  changeContent: (value: string) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  projectId: '',
  changeProjectId: (value) => set(() => ({projectId: value})),
  content: initialContent,
  changeContent: (value) => set(() => ({content: value})),
}));
