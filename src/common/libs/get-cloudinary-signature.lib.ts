/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export const getSignature = async () => {
  const response = await fetch("/api/cloudinary/sign");
  const data = await response.json();
  const { signature, timestamp } = data;
  return { signature, timestamp };
};
