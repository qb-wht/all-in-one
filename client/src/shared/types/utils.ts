/* eslint-disable @typescript-eslint/no-explicit-any */

export type PartialByKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type PartialWithoutKeys<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export type Head<A extends any[]> = A extends [infer H, ...any] ? H : never;
export type Tail<A extends any[]> = A extends [any, ...infer Tail] ? Tail : [];

export type Length<A extends any[]> = A['length'];

export type Drop<A extends any[], N extends number, I extends any[] = []> =
  Length<A> extends 0 ? A : Length<I> extends N ? A : Drop<Tail<A>, N, [...I, any]>;
