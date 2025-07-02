import {Tree} from 'antd';
import {useEffect, useRef} from 'react';
import {Resizer, useResizer} from '@/shared/components/resizer';
import {cn} from '@/shared/lib/classNames';
import type {PropsOf} from '@/shared/types';
import {subscribeOnFilesChanges} from '../api/api';
import {useFileTreeStore} from '../model';
import s from './FileTree.module.css';
import {FileTreeControls} from './FilteTreeControls';

const {DirectoryTree} = Tree;

export type FileTreeProps = {} & PropsOf<HTMLDivElement>;

export const FileTree = (props: FileTreeProps) => {
  const {className, ...anotherProps} = props;
  const classNames = cn('g-1 column', s.fileTree, className).build();

  const openedFilePath = useFileTreeStore((state) => state.openedFilePath);
  const changeOpenedFilePath = useFileTreeStore((state) => state.changeOpenedFilePath);
  const tree = useFileTreeStore((state) => state.tree);

  useEffect(() => {
    const unsubscribe = subscribeOnFilesChanges();

    return unsubscribe;
  }, []);

  const bodyRef = useRef<HTMLDivElement | null>(null);
  const resizerRef = useRef<HTMLDivElement | null>(null);

  useResizer({bodyRef, resizerRef, type: 'horizontal'});

  return (
    <div ref={bodyRef} className={classNames} {...anotherProps} style={{width: '250px'}}>
      <FileTreeControls />

      <DirectoryTree
        selectedKeys={openedFilePath ? [openedFilePath] : undefined}
        onSelect={(keys) => changeOpenedFilePath((keys as string[])[0])}
        treeData={tree}
      />

      <Resizer ref={resizerRef} type='horizontal' />
    </div>
  );
};
