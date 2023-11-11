/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
const removeDuplicates = (arr: any[], prop: keyof any): any[] => {
  const uniqueMap = new Map<any, any>();

  arr.forEach((obj) => {
    const key = obj[prop];
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, obj);
    }
  });

  return Array.from(uniqueMap.values());
};

export default removeDuplicates;
