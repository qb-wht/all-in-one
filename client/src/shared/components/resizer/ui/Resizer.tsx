import {cn} from '@/shared/lib/classNames';
import type {PropsOf} from '@/shared/types';
import s from './Resizer.module.css';

export type ResizerProps = {
  type: 'horizontal' | 'vertical';
  placement: 'top' | 'right' | 'bottom' | 'left';
  ref: React.RefObject<HTMLDivElement | null>;
} & PropsOf<HTMLDivElement>;

export const Resizer = (props: ResizerProps) => {
  const {className, ref, type = 'horizontal', placement = 'right', ...anotherProps} = props;

  const mods = {
    [s.horizontal]: type === 'horizontal',
    [s.vertical]: type === 'vertical',
    [s.top]: placement === 'top',
    [s.right]: placement === 'right',
    [s.bottom]: placement === 'bottom',
    [s.left]: placement === 'left',
  };

  const classNames = cn(s.resizer, className).build(mods);

  return (
    <div ref={ref} className={classNames} {...anotherProps}>
      <div className={cn(s.line).build(mods)} />
    </div>
  );
};
