import {Tree} from 'antd';
import {useEffect} from 'react';
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

  return (
    <div className={classNames} {...anotherProps} style={{width: '250px'}}>
      <FileTreeControls />

      <DirectoryTree
        selectedKeys={openedFilePath ? [openedFilePath] : undefined}
        onSelect={(keys) => changeOpenedFilePath((keys as string[])[0])}
        treeData={tree}
      />
    </div>
  );
};
