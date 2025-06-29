export const suppress = <T extends {preventDefault: () => void; stopPropagation: () => void}>(
  fn: (e: T) => unknown,
) => {
  return (e: T) => {
    e.preventDefault();
    e.stopPropagation();
    fn(e);
  };
};

export const preventDefault = <T extends {preventDefault: () => void}>(
  fn: (e: T) => unknown = () => {},
) => {
  return (e: T) => {
    e.preventDefault();
    fn(e);
  };
};

export const stopPropagation = <T extends {stopPropagation: () => void}>(fn: (e: T) => unknown) => {
  return (e: T) => {
    e.stopPropagation();
    fn(e);
  };
};
