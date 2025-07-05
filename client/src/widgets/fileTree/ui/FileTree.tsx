import {Tree} from 'antd';
import {useEffect, useRef} from 'react';
import '@/widgets/fileTree';
import {useEditorStore} from '@/entities/editor';
import {getFiles, useFileTreeStore} from '@/entities/file';
import {createTree} from '@/entities/file';
import {fileService} from '@/shared/api';
import {Resizer, useResizer} from '@/shared/components/resizer';
import {cn} from '@/shared/lib/classNames';
import type {PropsOf} from '@/shared/types';
import s from './FileTree.module.css';
import {FileTreeControls} from './FilteTreeControls';
import {widthPredicate} from './helpers';

const {DirectoryTree} = Tree;

export type FileTreeProps = {} & PropsOf<HTMLDivElement>;

export const FileTree = (props: FileTreeProps) => {
  const {className, ...anotherProps} = props;
  const classNames = cn('g-1 column', s.fileTree, className).build();

  const selectedNodes = useFileTreeStore((state) => state.selectedNodes);
  const changeSelectedNodes = useFileTreeStore((state) => state.changeSelectedNodes);
  const tree = useFileTreeStore((state) => state.tree);
  const changeTree = useFileTreeStore((state) => state.changeTree);
  const projectId = useEditorStore((state) => state.projectId);
  const changeOpenedFile = useEditorStore((state) => state.changeOpenedFile);

  useEffect(() => {
    const getAppProjectFiles = async () => {
      const files = await getFiles(projectId);
      changeTree(createTree(files));
    };

    getAppProjectFiles();

    const unsubscribe = fileService.subscribe(getAppProjectFiles, getAppProjectFiles);
    return unsubscribe;
  }, [projectId]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const resizerRef = useRef<HTMLDivElement | null>(null);

  useResizer({
    containerRef,
    resizerRef,
    type: 'horizontal',
    widthPredicate: widthPredicate,
  });

  return (
    <div ref={containerRef} className={classNames} {...anotherProps} style={{width: '250px'}}>
      <FileTreeControls />

      <DirectoryTree
        selectedKeys={selectedNodes.map(({key}) => key)}
        onSelect={(_, {selectedNodes}) => {
          changeSelectedNodes(selectedNodes);

          if (selectedNodes[0].nodeType === 'file') {
            changeOpenedFile(selectedNodes[0]);
            return;
          }

          changeOpenedFile(undefined);
        }}
        treeData={tree}
      />

      <Resizer ref={resizerRef} type='horizontal' placement='right' />
    </div>
  );
};
