import {cn} from '@/shared/lib/classNames';
import type {PropsOf} from '@/shared/types';
import s from './EditorSettingsBar.module.css';
import {Button} from 'antd';
import {useAppSettingsStore} from '@/entities/appSettings/model';

export type EditorSettingsBarProps = {} & PropsOf<HTMLDivElement>;

export const EditorSettingsBar = (props: EditorSettingsBarProps) => {
  const {className, ...anotherProps} = props;
  const classNames = cn(s.editorSettingsBar, className).build();

  const isLocal = useAppSettingsStore((state) => state.isLocal);
  const changeIsLocal = useAppSettingsStore((state) => state.changeIsLocal);

  const isSource = useAppSettingsStore((state) => state.isSource);
  const changeIsSource = useAppSettingsStore((state) => state.changeIsSource);

  return (
    <div className={classNames} {...anotherProps}>
      <Button onClick={() => changeIsLocal(!isLocal)}>
        {isLocal ? 'Use Local' : 'Use Server'}
      </Button>

      <Button onClick={() => changeIsSource(!isSource)}>
        {isSource ? 'Open View Editor' : 'Open Code Editor'}
      </Button>
    </div>
  );
};
