/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from "axios";

export const deleteAssets = async (
  payload: string | undefined
): Promise<any> => {
  if (!payload) return;

  const { data } = await axios.post(
    "/api/cloudinary/destroy",
    { payload },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  return data;
};
