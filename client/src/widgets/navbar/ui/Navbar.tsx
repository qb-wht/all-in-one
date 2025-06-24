import {useAppSettingsStore} from '@/entities/appSettings/model';
import s from './styles.module.css';
import {cn} from '@/shared/lib/classNames';

export const Navbar = () => {
  const isLocal = useAppSettingsStore((state) => state.isLocal);
  const changeIsLocal = useAppSettingsStore((state) => state.changeIsLocal);

  const isSource = useAppSettingsStore((state) => state.isSource);
  const changeIsSource = useAppSettingsStore((state) => state.changeIsSource);

  return (
    <div className={cn('row gap-1', s.navbar).build()}>
      <button onClick={() => changeIsLocal(!isLocal)}>
        {isLocal ? 'Use Local' : 'Use Server'}
      </button>

      <button onClick={() => changeIsSource(!isSource)}>
        {isSource ? 'Open View Editor' : 'Open Code Editor'}
      </button>
    </div>
  );
};
