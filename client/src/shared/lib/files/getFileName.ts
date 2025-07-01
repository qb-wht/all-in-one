export const getFileName = (filePath: string) => {
  const fileName = filePath.split(/[\\/]/).pop() || filePath;

  const lastDotIndex = fileName.lastIndexOf('.');
  return lastDotIndex <= 0 ? fileName : fileName.slice(0, lastDotIndex);
};
