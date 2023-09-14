/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getSignature } from "./get-cloudinary-signature.lib";
import { uploadFile } from "./upload-file.lib";

export const handleUploadCloudinary = async (file: File) => {
  const { signature, timestamp } = await getSignature();
  const formData = new FormData();
  formData.append("signature", signature);
  formData.append("timestamp", timestamp);
  formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY as string);
  formData.append("file", file);

  return await uploadFile({
    formData,
  });
};
