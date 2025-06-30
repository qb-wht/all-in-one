import {Button} from 'antd';
import {useAppSettingsStore} from '@/entities/appSettings';
import {cn} from '@/shared/lib/classNames';
import type {PropsOf} from '@/shared/types';

export type AppSettingsBarProps = {} & PropsOf<HTMLDivElement>;

export const AppSettingsBar = (props: AppSettingsBarProps) => {
  const {className, ...anotherProps} = props;
  const classNames = cn('row g-1 p-1 jc-space-between', className).build();

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
