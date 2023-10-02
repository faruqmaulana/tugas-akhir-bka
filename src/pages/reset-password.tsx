/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/common/components/ui/button/Button";
import { zodResolver } from "@hookform/resolvers/zod";

import { requireAuth } from "~/common/authentication/requireAuth";
import { customToast } from "~/common/components/ui/toast/showToast";

import styles from "~/styles/ui/Login.module.scss";
import { postRequest } from "~/common/services/base";
import { type GlobalApiResType } from "~/common/types/GlobalApiResType";
import { RESET_PASSWORD } from "~/common/constants/API";
import { z } from "zod";
import EyeIcon from "~/common/components/svg/EyeIcon";
import EyeSlashIcon from "~/common/EyeSlashIcon";
import { type ResponseEmailVerificationData } from "./confirm-email";
import Text from "~/common/components/ui/text/Text";

export const getServerSideProps = requireAuth(async (ctx) => {
  const { email, token } = ctx.query;
  return { props: { email, token } };
});

export default function ForgotPassword(props: ResponseEmailVerificationData) {
  const { email, token } = props;
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const passwordSchema = z.object({
    password: z.string().min(1, "Required!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof passwordSchema>) => {
      const { password } = data;
      setLoading(true);
      const request = await postRequest<GlobalApiResType>(RESET_PASSWORD, {
        email,
        token,
        password,
      });
      customToast(
        request.status !== "ok" ? "error" : "success",
        request.message
      );
      setLoading(false);
      if (request.status === "ok") {
        void router.push("/");
      }
    },
    [loading]
  );

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Text className="text-center !text-xl">
          Masukkan password baru anda
        </Text>
        <div className={`relative flex flex-col`}>
          <input
            className={`${styles.formControl}`}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
          />
          <button
            type="button"
            className="absolute right-2 top-3"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
          </button>
          {errors.password?.message && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className={styles.formButton}>
            <Button
              isPrimary
              isSubmit
              isMedium
              isUppercase
              className="w-full"
              isLoading={loading}
            >
              Submit
            </Button>
          </div>
          <div className={styles.forgotPassword}>
            <Link href="/" className={styles.forgot}>
              Kembali ke Login
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
