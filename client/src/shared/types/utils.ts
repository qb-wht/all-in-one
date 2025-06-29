export type PartialByKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type PartialWithoutKeys<T, K extends keyof T> = Partial<T> & Pick<T, K>;
