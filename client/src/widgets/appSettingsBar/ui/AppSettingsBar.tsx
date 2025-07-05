import {Button} from 'antd';
import {useAppSettingsStore} from '@/entities/appSettings';
import {cn} from '@/shared/lib/classNames';
import type {PropsOf} from '@/shared/types';
import s from './AppSettingsBar.module.css';

export type AppSettingsBarProps = {} & PropsOf<HTMLDivElement>;

export const AppSettingsBar = (props: AppSettingsBarProps) => {
  const {className, ...anotherProps} = props;
  const classNames = cn(
    'row jc-space-between ai-center g-1 pr-1 pl-1',
    s.appSettingsBar,
    className,
  ).build();

  const isLocal = useAppSettingsStore((state) => state.isLocal);
  const changeIsLocal = useAppSettingsStore((state) => state.changeIsLocal);

  const isSource = useAppSettingsStore((state) => state.isSource);
  const changeIsSource = useAppSettingsStore((state) => state.changeIsSource);

  return (
    <div className={classNames} {...anotherProps}>
      <Button onClick={() => changeIsSource(!isSource)}>
        {isSource ? 'Open View Editor' : 'Open Code Editor'}
      </Button>

      <Button onClick={() => changeIsLocal(!isLocal)}>
        {isLocal ? 'Use Local' : 'Use Server'}
      </Button>
    </div>
  );
};
