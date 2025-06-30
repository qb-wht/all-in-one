import {Tree} from 'antd';
import {useRef} from 'react';
import {cn} from '@/shared/lib/classNames';
import type {PropsOf} from '@/shared/types';
import s from './FileTree.module.css';

const {DirectoryTree} = Tree;

const a = [
  {
    key: 'app',
    title: 'app',
    children: [
      {
        key: 'app-layout',
        title: 'layouts',
        isLeaf: true,
      },
    ],
  },
  {
    key: 'pages',
    title: 'pages',
    children: [
      {
        key: 'page-home',
        title: 'HomePage',
        isLeaf: true,
      },
      {
        key: 'page-about',
        title: 'AboutPage',
        isLeaf: true,
      },
    ],
  },
  {
    key: 'widgets',
    title: 'widgets',
    children: [
      {
        key: 'widget-header',
        title: 'Header',
        isLeaf: true,
      },
      {
        key: 'widget-footer',
        title: 'Footer',
        isLeaf: true,
      },
    ],
  },
  {
    key: 'features',
    title: 'features',
    children: [
      {
        key: 'feature-auth',
        title: 'auth',
        children: [
          {
            key: 'feature-auth-login',
            title: 'LoginForm',
            isLeaf: true,
          },
          {
            key: 'feature-auth-register',
            title: 'RegisterForm',
            isLeaf: true,
          },
        ],
      },
    ],
  },
  {
    key: 'entities',
    title: 'entities',
    children: [
      {
        key: 'entity-user',
        title: 'User',
        isLeaf: true,
      },
      {
        key: 'entity-product',
        title: 'Product',
        isLeaf: true,
      },
    ],
  },
  {
    key: 'shared',
    title: 'shared',
    children: [
      {
        key: 'shared-ui',
        title: 'UI',
        children: [
          {
            key: 'shared-ui-button',
            title: 'Button',
            isLeaf: true,
          },
          {
            key: 'shared-ui-input',
            title: 'Input',
            isLeaf: true,
          },
        ],
      },
      {
        key: 'shared-utils',
        title: 'utils',
        isLeaf: true,
      },
    ],
  },
];

export type FileTreeProps = {} & PropsOf<HTMLDivElement>;

export const FileTree = (props: FileTreeProps) => {
  const {className, ...anotherProps} = props;
  const ref = useRef<HTMLDivElement>(null);
  const classNames = cn(s.fileTree, className).build();

  return (
    <div ref={ref} className={classNames} {...anotherProps} style={{width: '250px'}}>
      <DirectoryTree treeData={a} />

      <div></div>
    </div>
  );
};
