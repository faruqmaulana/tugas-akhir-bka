const idrToNumber = (value: string) => {
  const tempValue = value
    .replaceAll("Rp", "")
    .replaceAll(".", "")
    .replaceAll(" ", "")
    .trim();

  return Number(tempValue);
};

export default idrToNumber;
