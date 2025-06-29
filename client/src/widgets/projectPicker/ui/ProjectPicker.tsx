import {Link} from '@tanstack/react-router';
import {Button, Image, Input, List} from 'antd';
import {useEffect, useState} from 'react';
import {cn} from '@/shared/lib/classNames';
import type {PropsOf} from '@/shared/types';
import {createProject, subscribeOnProjectsChanges} from '../api';
import {useProjectsStore} from '../model';
import s from './ProjectPicker.module.css';

export type ProjectPickerProps = {} & PropsOf<HTMLDivElement>;

export const ProjectPicker = (props: ProjectPickerProps) => {
  const {className, ...anotherProps} = props;
  const classNames = cn('column g-2 p-1 ai-center', className).build();

  const {projects} = useProjectsStore((state) => state);

  useEffect(() => {
    const unsubscribe = subscribeOnProjectsChanges();
    return unsubscribe;
  }, []);

  const [title, setTitle] = useState('');

  const addProjectHandler = async () => {
    await createProject(title);
    setTitle('');
  };

  return (
    <div className={classNames} {...anotherProps}>
      <div className='center max-width fd-column g-1'>
        <div className='center fd-column'>
          <Image preview={false} src='/logo.svg' width={320} height={320} alt='Logo' />

          <h1>ALL IN ONE PROJECTS</h1>
        </div>

        <div className='row g-1'>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          <Button onClick={addProjectHandler}>Create Project</Button>
        </div>

        <div className='row'>
          <List
            className='width-100'
            dataSource={projects}
            renderItem={({title, _id}) => (
              <Link to='/editor/$projectId' params={{projectId: _id}}>
                <List.Item className={s.listItem}>
                  <div className={cn(s.projectItem, 'row ai-center jc-space-between').build()}>
                    {title}

                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                      className={s.button}
                      variant='text'
                      color='danger'
                    >
                      Delete
                    </Button>
                  </div>
                </List.Item>
              </Link>
            )}
          />
        </div>
      </div>
    </div>
  );
};
