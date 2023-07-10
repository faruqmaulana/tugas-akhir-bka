const findString = (data: string[], value: string): boolean => {
  return !!data.find((item: string) => item === value);
};

export { findString };
