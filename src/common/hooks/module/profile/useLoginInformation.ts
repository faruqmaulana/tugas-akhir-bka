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

const useLoginInformation = () => {
  const {
    state: { user },
  } = useGlobalContext();
  const { refetch: refetchUserProfile } = api.user.userProfile.useQuery();

  const [loading, setLoading] = useState<boolean>(false);
  const { mutate: mutateLoginInformation } =
    api.user.updateLoginInformation.useMutation();

  const {
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

  useEffect(() => {
    if (user) {
      // Define a type for the allowed keys
      type UserKey = keyof ILoginInformation;

      // Set default values from API response
      Object.entries(user).forEach(([key, value]) => {
        // Cast the key to the allowed type
        const userKey = key as UserKey;
        const valueKey = value as string;
        setValue(userKey, valueKey);
      });
    }
  }, [setValue, user]);

  const onSubmit = useCallback((payload: ILoginInformation) => {
    setLoading(true);
    mutateLoginInformation(payload, {
      onSuccess(data, variable) {
        customToast("success", data?.message);
        setLoading(false);
        void refetchUserProfile();
      },
      onError(error) {
        customToast("error", error?.message);
        setLoading(false);
      },
    });
  }, []);

  return { register, handleSubmit, errors, onSubmit, loading };
};

export { useLoginInformation };
