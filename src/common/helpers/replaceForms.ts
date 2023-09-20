/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export function replaceForms(existingData: any[], newData: any[]) {
  // Create a mapping of labels to items from newData
  const labelToItem = newData.reduce(
    (map: { [x: string]: any }, item: { label: string | number }) => {
      if (item.label) {
        map[item.label] = item;
      }
      return map;
    },
    {}
  );

  // Use Array.map to update existingData based on labels
  const updatedData = existingData.map((item: { label: string | number }) => {
    return item.label && labelToItem[item.label]
      ? labelToItem[item.label]
      : item;
  });

  return updatedData;
}
