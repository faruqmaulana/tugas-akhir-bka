/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios, { type AxiosResponse } from "axios";
import { getBaseUrl } from "~/utils/api";

export async function postRequest<T>(URL: string, payload: object): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios.post(
      `${getBaseUrl()}${URL}`,
      payload
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        (error?.response?.data?.message as string) || "An error occurred"
      );
    } else {
      throw new Error("An error occurred");
    }
  }
}
