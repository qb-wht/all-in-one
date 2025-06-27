import s from './styles.module.css';
import {cn} from '@/shared/lib/classNames';
import type {PropsOf} from '@/shared/types';
import {Link} from '@tanstack/react-router';
import {Button} from 'antd';

export type NavbarProps = {} & PropsOf<HTMLDivElement>;

export const Navbar = (props: NavbarProps) => {
  const {className, ...anotherProps} = props;
  const classNames = cn('row gap-1', s.navbar, className).build();

  return (
    <div className={classNames} {...anotherProps}>
      <Link to='/'>
        <Button>Home</Button>
      </Link>

      <Link to='/editor'>
        <Button>Editor</Button>
      </Link>
    </div>
  );
};
