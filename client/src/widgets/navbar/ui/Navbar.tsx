import {Link} from '@tanstack/react-router';
import {Button} from 'antd';
import {cn} from '@/shared/lib/classNames';
import type {PropsOf} from '@/shared/types';
import s from './Navbar.module.css';

export type NavbarProps = {} & PropsOf<HTMLDivElement>;

export const Navbar = (props: NavbarProps) => {
  const {className, ...anotherProps} = props;
  const classNames = cn('row g-1 pr-1 pl-1 ai-center', s.navbar, className).build();

  return (
    <div className={classNames} {...anotherProps}>
      <Link to='/'>
        <Button>Home</Button>
      </Link>
    </div>
  );
};
