import {create} from 'zustand';
import type {FileNode} from '@/entities/file/@x/editor';

export interface EditorState {
  projectId: string;
  changeProjectId: (value: string) => void;
  openedFile?: FileNode;
  changeOpenedFile: (value?: FileNode) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  projectId: '',
  changeProjectId: (value) => set(() => ({projectId: value})),
  openedFile: undefined,
  changeOpenedFile: (value) => set(() => ({openedFile: value})),
}));
