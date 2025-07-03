export interface CRUD {
  create(...args: unknown[]): unknown;
  remove(...args: unknown[]): unknown;
  update(...args: unknown[]): unknown;
  get(...args: unknown[]): unknown;
  getAll(...args: unknown[]): unknown;
}

export type Unsubscribe = () => void;

export interface Observable<T, I> {
  subscribe(onUpdate?: (data: T) => void, onDelete?: (info: I) => void): Unsubscribe;
}
