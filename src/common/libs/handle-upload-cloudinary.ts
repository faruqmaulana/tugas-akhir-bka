/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { deleteAssets } from "./delete-assets.lib";
import { getSignature } from "./get-cloudinary-signature.lib";
import { uploadFile } from "./upload-file.lib";

export type UploadAndReplaceType = {
  file: File | null | undefined;
  previusFileId?: string | undefined;
};

export const handleUploadCloudinary = async (data: UploadAndReplaceType) => {
  const { file, previusFileId } = data;
  if (!file) return null;

  const { signature, timestamp } = await getSignature();
  const formData = new FormData();
  formData.append("signature", signature);
  formData.append("timestamp", timestamp);
  formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY as string);
  formData.append("file", file);

  const requestUpload = await uploadFile({
    formData,
  });

  if (requestUpload) {
    const aa = await deleteAssets(previusFileId);
    console.log("previusFileId", previusFileId);
    console.log("aa", aa);
  }

  console.log("requestUpload", requestUpload);

  return requestUpload;
};
