/* eslint-disable @typescript-eslint/no-explicit-any */
import {cast} from '@/shared/types';
import type {Drop, Length} from '@/shared/types/utils';

type PartialCurryParams<A extends any[]> =
  Length<A> extends 0 ? A : Partial<A> & {0: A[0]; length: number};

export type SimpleCurry<A extends any[], R> = {
  '0': () => R;
  N: <A2 extends PartialCurryParams<A>>(
    ...a: A2
  ) => Length<A> extends Length<A2> ? R : SimpleCurry<Drop<A, Length<A2>>, R>;
}[Length<A> extends 0 ? '0' : 'N'];

export const simpleCurry = <A extends any[], R>(fn: (...a: A) => R): SimpleCurry<A, R> => {
  return cast(function curried(this: unknown, ...args: any[]) {
    if (fn.length <= args.length) {
      return fn.apply(this, args as A);
    }

    return function (this: unknown, ...args2: unknown[]) {
      return curried.call(this, ...args, ...args2);
    };
  });
};
