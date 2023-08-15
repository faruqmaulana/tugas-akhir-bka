/* eslint-disable @typescript-eslint/no-misused-promises */
import { useGlobalContext } from "~/common/context/GlobalContext";
import { useForm } from "react-hook-form";
import {
  type ILoginInformation,
  loginInformation,
} from "~/common/schemas/user/login-information.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { api } from "~/utils/api";
import { customToast } from "~/common/components/ui/toast/showToast";
import { type UserProfileType } from "~/server/queries/module/user/user.query";

const useLoginInformation = () => {
  const {
    state: { user },
  } = useGlobalContext();

  const [loading, setLoading] = useState<boolean>(false);
  const { mutate: updateUserPassword } =
    api.user.updateUserPassword.useMutation();

  const {
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInformation>({
    defaultValues: {
      password: "",
    },
    resolver: zodResolver(loginInformation),
  });

  const handleDefaultForm = (user: UserProfileType) => {
    // Define a type for the allowed keys
    type UserKey = keyof ILoginInformation;

    // Set default values from API response
    Object.entries(user).forEach(([key, value]) => {
      // Cast the key to the allowed type
      const userKey = key as UserKey;
      const valueKey = value as string;
      setValue(userKey, valueKey);
    });
  };

  useEffect(() => {
    if (user) {
      handleDefaultForm(user);
    }
  }, [setValue, user]);

  const onSubmit = useCallback((payload: ILoginInformation) => {
    setLoading(true);
    updateUserPassword(payload, {
      onSuccess: (data) => {
        customToast("success", data?.message);
        setLoading(false);
        reset();
        handleDefaultForm(data.data);
      },
      onError: (error) => {
        customToast("error", error?.message);
        setLoading(false);
      },
    });
  }, []);

  return { register, handleSubmit, errors, onSubmit, loading };
};

export { useLoginInformation };
