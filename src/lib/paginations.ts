export const pagination = <T>(data: T[], page: number, limit: number): T[] => {
  const startIndex = page * limit;
  const endIndex = startIndex + limit;
  return data?.slice(startIndex, endIndex);
};
