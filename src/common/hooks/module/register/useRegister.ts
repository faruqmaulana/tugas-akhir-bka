import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { customToast } from "~/common/components/ui/toast/showToast";
import {
  type IRegisterSchema,
  registerSchema,
} from "~/common/schemas/module/register/register.schema";
import { api } from "~/utils/api";
import { CONFIRM_EMAIL_PAGE } from "~/common/constants/routers";

const useRegister = () => {
  const router = useRouter();
  const { mutate: registerNewUser } =
    api.register.registerNewUser.useMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = useCallback((payload: IRegisterSchema) => {
    setLoading(true);
    registerNewUser(payload, {
      onSuccess: (data) => {
        const { email, token } = data?.data || {};
        customToast("success", data?.message);
        setLoading(false);
        void router.push(`${CONFIRM_EMAIL_PAGE}?email=${email}&token=${token}`);
      },
      onError: (error) => {
        customToast("error", error?.message);
        setLoading(false);
      },
    });
  }, []);

  return { onSubmit, register, handleSubmit, loading, errors };
};

export { useRegister };
