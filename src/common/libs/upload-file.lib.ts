import axios from "axios";

type FileResponse = {
  bytes: string;
  asset_id: string;
  public_id: string;
  secure_url: string;
  created_at: string;
  version_id: string;
  original_filename: string;
};

type UploadFileProps = {
  formData: FormData | null;
};

export const uploadFile = async ({
  formData,
}: UploadFileProps): Promise<FileResponse> => {
  const { data } = await axios.request<FileResponse>({
    method: "POST",
    url: process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL || "",
    data: formData,
  });

  return {
    bytes: data.bytes,
    public_id: data.public_id,
    asset_id: data.asset_id,
    secure_url: data.secure_url,
    version_id: data.version_id,
    created_at: data.created_at,
    original_filename: data.original_filename,
  };
};
