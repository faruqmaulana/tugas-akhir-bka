/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import EyeSlashIcon from "~/common/EyeSlashIcon";
import { Button } from "~/common/components/ui/button/Button";
import { loginSchema, type ILogin } from "~/common/schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";

import styles from "~/styles/ui/Login.module.scss";
import { requireAuth } from "~/common/authentication/requireAuth";
import { showToast } from "~/common/components/ui/toast/showToast";
import EyeIcon from "~/common/components/svg/EyeIcon";
import GoogleButton from "~/common/components/ui/button/GoogleButton";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    defaultValues: {
      npm: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = useCallback(
    async (data: ILogin) => {
      setLoading(true);
      const request = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      showToast(request);

      // check error login
      const error = !request?.ok;
      if (error) {
        setLoading(false);
        return;
      }

      void router.push("/dashboard");
    },
    [loading]
  );

  return (
    <div className="flex flex-col gap-5">
      <GoogleButton text="Sign in with Google" />
      <div className="relative my-2 w-full border-b border-gray-400">
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 text-gray-600 -translate-y-1/2 bg-white px-2">
          OR
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className="relative flex flex-col gap-1">
          <input
            className={`${styles.formControl}`}
            type="text"
            placeholder="npm"
            {...register("npm")}
          />
          {errors.npm?.message && (
            <p className="text-red-500">{errors.npm?.message}</p>
          )}
        </div>
        <div className={`relative flex flex-col gap-1`}>
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
        <div className="flex flex-col">
          <div className={styles.forgotPassword}>
            <Link href="/forgot-password" className={styles.forgot}>
              Lupa Password?
            </Link>
          </div>
          <div className={styles.formButton}>
            <Button
              isPrimary
              isSubmit
              isMedium
              isUppercase
              className="w-full"
              isLoading={loading}
            >
              Login
            </Button>
          </div>
          <div className={`${styles.forgotPassword} mt-1`}>
            Belum punya akun? &nbsp;
            <Link href="/register" className={styles.forgot}>
              Daftar di sini
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
