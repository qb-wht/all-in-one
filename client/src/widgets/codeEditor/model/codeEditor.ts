import {create} from 'zustand';
import {initialContent} from './constants';

export interface CodeEditorState {
  content: string;
  changeContent: (value: string) => void;
}

export const useCodeEditorStore = create<CodeEditorState>((set) => ({
  content: initialContent,
  changeContent: (value) => set(() => ({content: value})),
}));
