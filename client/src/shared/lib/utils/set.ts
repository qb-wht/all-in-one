/* eslint-disable @typescript-eslint/no-explicit-any */

export const set = <O extends Record<string, any>, P extends string>(
  obj: O,
  path: P,
  setValue: any,
): void => {
  let currentObj: Record<string, any> = obj;

  const pathArr = path.split('.');

  for (let i = 0; i < pathArr.length; i++) {
    const pathEl = pathArr[i];

    if (i === pathArr.length - 1) {
      currentObj[pathEl] = setValue;
      return;
    }

    const value = currentObj?.[pathEl];

    if (!value) {
      value[pathEl] = {};
    }

    currentObj = value;
  }
};
