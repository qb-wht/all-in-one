import {cn} from '@/shared/lib/classNames';
import type {PropsOf} from '@/shared/types';
import s from './Resizer.module.css';

export type ResizerProps = {
  type: 'horizontal' | 'vertical';
  ref: React.RefObject<HTMLDivElement | null>;
} & PropsOf<HTMLDivElement>;

export const Resizer = (props: ResizerProps) => {
  const {className, ref, ...anotherProps} = props;
  const classNames = cn(s.resizer, className).build();

  return (
    <div ref={ref} className={classNames} {...anotherProps}>
      <div className={s.resizerLine} />
    </div>
  );
};
