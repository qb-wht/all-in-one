import type {File} from '@/shared/api';
import type {FileNode, FileTreeNode, FolderNode} from './types';

export const createTree = (files: File[]): FileTreeNode[] => {
  const tree: FileTreeNode[] = [];
  const pathMap: Record<string, FileTreeNode> = {};

  const sortedFiles = [...files].sort((a, b) => a.path.localeCompare(b.path));

  for (const file of sortedFiles) {
    const pathParts = file.path.split('/');
    let currentLevel = tree;
    let currentPath = '';

    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i];
      const isFile = i === pathParts.length - 1;
      currentPath = currentPath ? `${currentPath}/${part}` : part;

      let node = pathMap[currentPath];

      if (!node) {
        if (isFile) {
          const fileNode: FileNode = {
            ...file,
            name: part,
            nodeType: 'file',
            key: file.path,
            title: part,
            isLeaf: true,
            children: [],
          };

          node = fileNode;
          currentLevel.push(node);
        } else {
          const folderNode: FolderNode = {
            title: part,
            isLeaf: false,
            type: 'file',
            key: currentPath,
            nodeType: 'folder',
            _id: null,
            _rev: null,
            content: null,
            name: part,
            path: currentPath,
            children: [],
          };

          node = folderNode;
          currentLevel.push(node);
        }
        pathMap[currentPath] = node;
      }

      if (node.children) {
        currentLevel = node.children;
      }
    }
  }

  return tree;
};
