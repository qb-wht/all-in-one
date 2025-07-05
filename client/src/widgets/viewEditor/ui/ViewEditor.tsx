import {useEffect, useState} from 'react';
import {useEditorStore} from '@/entities/editor';
import {cn} from '@/shared/lib/classNames';
import type {PropsOf} from '@/shared/types';
import image from './view.png';

export type ViewEditorProps = {} & PropsOf<HTMLDivElement>;

export const ViewEditor = (props: ViewEditorProps) => {
  const {className, ...anotherProps} = props;
  const classNames = cn('center', className).build();
  const openedFile = useEditorStore((state) => state.openedFile);

  const [localValue, setLocalValue] = useState<string | undefined>();

  useEffect(() => {
    if (openedFile) {
      openedFile?.content.text().then((value) => setLocalValue(value));
      return;
    }

    setLocalValue(undefined);
  }, [openedFile]);

  return (
    <div className={classNames} {...anotherProps}>
      {localValue !== undefined && (
        <div className='center fd-column'>
          {openedFile?.path}
          <img style={{width: '54rem', height: '36rem'}} src={image} alt='View Editor' />
        </div>
      )}
    </div>
  );
};
