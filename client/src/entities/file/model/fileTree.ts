import {create} from 'zustand';
import type {FileTreeNode} from './types';

export interface FileTreeState {
  selectedNodes: FileTreeNode[];
  changeSelectedNodes: (value: FileTreeNode[]) => void;
  isOpenCreateFileModal: boolean;
  changeIsOpenCreateFileModal: (value?: boolean) => void;
  tree: FileTreeNode[];
  changeTree: (value: FileTreeNode[]) => void;
}

export const useFileTreeStore = create<FileTreeState>((set) => ({
  selectedNodes: [],
  changeSelectedNodes: (value) => set(() => ({selectedNodes: value})),
  isOpenCreateFileModal: false,
  changeIsOpenCreateFileModal: (value) => set(() => ({isOpenCreateFileModal: value})),
  tree: [],
  changeTree: (value) => set(() => ({tree: value})),
}));
