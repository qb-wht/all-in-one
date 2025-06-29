import {Button, Input} from 'antd';
import {useState} from 'react';
import type {Project} from '@/shared/api';
import {cn} from '@/shared/lib/classNames';
import {preventDefault} from '@/shared/lib/event';
import {useInputState} from '@/shared/lib/hooks';
import type {PropsOf} from '@/shared/types';
import {changeProject, removeProject} from '../api';
import s from './ProjectItem.module.css';

export type ProjectPickerProps = {
  project: Project;
} & PropsOf<HTMLDivElement>;

export const ProjectItem = (props: ProjectPickerProps) => {
  const {className, project, ...anotherProps} = props;

  const [isEdit, setIsEdit] = useState(false);
  const [newName, changeNewName] = useInputState(project.name);

  const classNames = cn('row ai-center jc-space-between fs-0', s.projectItem, className).build();

  const removeProjectHandler = preventDefault(() => removeProject(project));

  const enableIsEdit = preventDefault(() => setIsEdit(true));
  const disableIsEdit = preventDefault(() => {
    changeProject({...project, name: newName});
    setIsEdit(false);
  });

  return (
    <div className={classNames} {...anotherProps}>
      {isEdit ? (
        <Input
          className='width-auto'
          onClick={preventDefault()}
          onChange={changeNewName}
          value={newName}
        />
      ) : (
        project.name
      )}

      <div className='row g-1 width-auto'>
        <Button
          onClick={isEdit ? disableIsEdit : enableIsEdit}
          className={s.button}
          variant='text'
          color='primary'
        >
          {isEdit ? 'Apply' : 'Edit'}
        </Button>

        <Button onClick={removeProjectHandler} className={s.button} variant='text' color='danger'>
          Remove
        </Button>
      </div>
    </div>
  );
};
