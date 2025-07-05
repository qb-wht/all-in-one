/* eslint-disable @typescript-eslint/no-explicit-any */
import {curryWithGaps} from './curryWithGaps';
import {simpleCurry, type SimpleCurry} from './simpleCurry';

export interface Curry {
  <A extends any[], R>(fn: (...a: A) => R): SimpleCurry<A, R>;
  withGaps: typeof curryWithGaps;
}

const curry = simpleCurry as Curry;
curry.withGaps = curryWithGaps;

export {curry};
