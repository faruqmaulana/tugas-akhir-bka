import { type SignInResponse } from "next-auth/react";
import { toast } from "react-toastify";

export const showToast = (data: SignInResponse | undefined) => {
  const isError = !data?.ok;

  return toast(data?.error, {
    type: isError ? "error" : "success",
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};

export const customToast = (
  data: "error" | "success",
  message: string | undefined
) => {
  const isError = data?.toLowerCase() === "error";
  if (message)
    return toast(message, {
      type: isError ? "error" : "success",
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
};
