/* eslint-disable @typescript-eslint/no-explicit-any */
import {__, cast} from '@/shared/types';
import type {Drop, Head, Length, Tail} from '@/shared/types/utils';

type PartialCurryParametersWithGaps<A extends any[]> =
  Length<A> extends 0 ? A : {[K in keyof A]?: A[K] | __} & {0: A[0] | __; length: number};

type LengthWithoutGaps<A extends any[], R extends any[] = []> =
  Length<A> extends 0
    ? Length<R>
    : LengthWithoutGaps<Tail<A>, Head<A> extends __ ? R : [...R, any]>;

type ResolveGaps<A extends any[], O extends any[], R extends any[] = []> =
  Length<A> extends 0
    ? R
    : ResolveGaps<Tail<A>, Tail<O>, Head<A> extends __ ? [...R, NonNullable<Head<O>>] : R>;

export type CurryWithGaps<A extends any[], R> = {
  '0': () => R;
  N: <A2 extends PartialCurryParametersWithGaps<A>>(
    ...a: A2
  ) => Length<A> extends LengthWithoutGaps<A2>
    ? R
    : CurryWithGaps<[...ResolveGaps<A2, A>, ...Drop<A, Length<A2>>], R>;
}[Length<A> extends 0 ? '0' : 'N'];

export function curryWithGaps<A extends any[], R>(fn: (...a: A) => R): CurryWithGaps<A, R> {
  return cast(function curried(this: unknown, ...args: any[]) {
    const filteredArgs = filterGaps(args);

    if (fn.length <= filteredArgs.length) {
      return fn.apply(this, cast(args));
    }

    return function (this: unknown, ...args2: unknown[]) {
      args2 = args2.slice();

      if (filteredArgs.length < args.length) {
        const mergedArgs = args.reduce((acc: any, el: any) => {
          if (el === __ && args2.length > 0) {
            el = args2.shift();
          }

          acc.push(el);
          return acc;
        }, []);

        return curried.call(this, ...mergedArgs, ...args2);
      } else {
        return curried.call(this, ...args, ...args2);
      }
    };
  });

  function filterGaps(args: unknown[]) {
    return args.filter((arg) => arg !== __);
  }
}
