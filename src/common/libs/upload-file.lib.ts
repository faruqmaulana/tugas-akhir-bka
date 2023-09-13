import axios from "axios";

type ImageResponse = {
  asset_id: string;
  public_id: string;
  secure_url: string;
  original_filename: string;
  bytes: string;
  created_at: string;
};

type UploadFileProps = {
  formData: FormData | null;
  onUploadProgress: (progress: number) => void;
};

export const uploadFile = async ({
  formData,
  onUploadProgress,
}: UploadFileProps): Promise<ImageResponse> => {
  const { data } = await axios.request<ImageResponse>({
    method: "POST",
    url: process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL || "",
    data: formData,
    onUploadProgress(progressEvent) {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total!
      );
      onUploadProgress(percentCompleted);
    },
  });

  return data;
};
