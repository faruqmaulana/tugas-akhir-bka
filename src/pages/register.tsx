/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Link from "next/link";
import EyeSlashIcon from "~/common/EyeSlashIcon";
import { requireAuth } from "~/common/authentication/requireAuth";
import EyeIcon from "~/common/components/svg/EyeIcon";
import { Button } from "~/common/components/ui/button/Button";
import GoogleButton from "~/common/components/ui/button/GoogleButton";
import { useRegister } from "~/common/hooks/module/register/useRegister";

import styles from "~/styles/ui/Login.module.scss";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

export default function RegisterForm() {
  const {
    onSubmit,
    register,
    handleSubmit,
    loading,
    errors,
    showPassword,
    setShowPassword,
  } = useRegister();
  return (
    <div className="flex flex-col gap-5">
      <GoogleButton text="Sign up with Google" />
      <div className="relative my-1 w-full border-b border-gray-400">
        <p className="absolute text-sm left-1/2 top-1/2 -translate-x-1/2 text-gray-600 -translate-y-1/2 bg-white px-2">
          OR
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className="relative flex flex-col gap-1">
          <input
            className={`${styles.formControl}`}
            type="text"
            placeholder="Nama"
            {...register("name")}
          />
          {errors.name?.message && (
            <p className="text-red-500">{errors.name?.message}</p>
          )}
        </div>
        <div className="relative flex flex-col gap-1">
          <input
            className={`${styles.formControl}`}
            type="text"
            placeholder="NBI"
            {...register("npm")}
          />
          {errors.npm?.message && (
            <p className="text-red-500">{errors.npm?.message}</p>
          )}
        </div>
        <div className="relative flex flex-col gap-1">
          <input
            className={`${styles.formControl}`}
            type="text"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email?.message && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}
        </div>
        <div className={`relative flex flex-col gap-1`}>
          <input
            className={`${styles.formControl} `}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
          />
          <button
            type="button"
            className="absolute right-2 top-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
          </button>
          {errors.password?.message && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <div className={styles.formButton}>
            <Button
              isPrimary
              isLoading={loading}
              isSubmit
              isMedium
              isUppercase
              className="w-full"
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
    </div>
  );
}
