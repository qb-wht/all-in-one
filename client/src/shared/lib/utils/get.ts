/* eslint-disable @typescript-eslint/no-explicit-any */

type Get<O, P extends string> = {
  ByProp: P extends keyof O ? O[P] : never;
  ByPath: P extends `${infer Prop}.${infer Rest}`
    ? Prop extends keyof O
      ? Get<O[Prop], Rest>
      : never
    : never;
}[P extends `${string}.${string}` ? 'ByPath' : 'ByProp'];

export const get = <O extends Record<string, any>, P extends string>(
  obj: O,
  path: P,
): Get<O, P> => {
  let currentObj: Record<string, any> = obj;

  const pathArr = path.split('.');

  for (let i = 0; i < pathArr.length; i++) {
    const pathEl = pathArr[i];

    const value = currentObj?.[pathEl];
    if (!value) return undefined as Get<O, P>;

    currentObj = value;
  }

  return currentObj as Get<O, P>;
};
