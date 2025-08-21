export const sumBy = <T>(array: T[], key: keyof T): number => {
  return array.reduce((sum, item) => sum + (item[key] as unknown as number), 0);
};
