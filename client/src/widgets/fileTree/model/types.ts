import type {DataNode} from 'antd/es/tree';
import type {File} from '@/shared/api';

export type FolderNode = File &
  DataNode & {
    nodeType: 'folder';
    _id: null;
    _rev: null;
    content: null;
    children: FileTreeNode[];
  };

export type FileNode = File &
  DataNode & {
    nodeType: 'file';
    children: [];
  };

export type FileTreeNode = FolderNode | FileNode;
