/* eslint-disable @typescript-eslint/no-explicit-any */

export type PartialByKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type PartialWithoutKeys<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export type Head<A extends any[]> = A extends [infer H] ? H : never;

export type Tail<A extends any[]> = A extends [any, ...infer Tail] ? Tail : [];
