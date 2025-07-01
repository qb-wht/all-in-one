import {create} from 'zustand';
import type {FileTreeNode} from './types';

export interface FileTreeState {
  openedFilePath?: string;
  changeOpenedFilePath: (value?: string) => void;
  isOpenCreateFileModal: boolean;
  changeIsOpenCreateFileModal: (value?: boolean) => void;
  tree: FileTreeNode[];
  changeTree: (value: FileTreeNode[]) => void;
}

export const useFileTreeStore = create<FileTreeState>((set) => ({
  openedFilePath: undefined,
  changeOpenedFilePath: (value) => set(() => ({openedFilePath: value})),
  isOpenCreateFileModal: false,
  changeIsOpenCreateFileModal: (value) => set(() => ({isOpenCreateFileModal: value})),
  tree: [],
  changeTree: (value) => set(() => ({tree: value})),
}));
