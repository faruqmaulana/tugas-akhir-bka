/* eslint-disable @typescript-eslint/no-unsafe-assignment */
interface CloudinarySign {
  signature: string;
  timestamp: string;
}

export const getSignature = async (): Promise<CloudinarySign> => {
  const response = await fetch("/api/cloudinary/sign");
  const data = await response.json();
  const { signature, timestamp } = data;
  return { signature, timestamp };
};
