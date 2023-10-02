/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Link from "next/link";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/common/components/ui/button/Button";
import { zodResolver } from "@hookform/resolvers/zod";

import { requireAuth } from "~/common/authentication/requireAuth";
import { customToast } from "~/common/components/ui/toast/showToast";

import styles from "~/styles/ui/Login.module.scss";
import { postRequest } from "~/common/services/base";
import { type GlobalApiResType } from "~/common/types/GlobalApiResType";
import { EMAIL_SERVICES } from "~/common/constants/API";
import { z } from "zod";
import { EMAIL_TYPE } from "~/common/enums/EMAIL_TYPE";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

export default function ForgotPassword() {
  const [loading, setLoading] = useState<boolean>(false);

  const emailSchema = z.object({
    email: z.string().email(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof emailSchema>) => {
      const { email } = data;
      setLoading(true);
      const request = await postRequest<GlobalApiResType>(EMAIL_SERVICES, {
        email,
        type: EMAIL_TYPE.SEND_RESET_PASSWORD,
      });
      customToast(
        request.status !== "ok" ? "error" : "success",
        request.message
      );
      setLoading(false);
      reset();
    },
    [loading]
  );

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className="relative flex flex-col gap-1">
          <input
            className={`${styles.formControl}`}
            type="text"
            placeholder="Email Address"
            {...register("email")}
          />
          {errors.email?.message && (
            <p className="text-red-500">{errors.email?.message}</p>
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
              Send Reset Password
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
