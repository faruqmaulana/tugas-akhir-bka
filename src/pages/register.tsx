/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Link from "next/link";
import EyeSlashIcon from "~/common/EyeSlashIcon";
import { requireAuth } from "~/common/authentication/requireAuth";
import { Button } from "~/common/components/ui/button/Button";
import { useRegister } from "~/common/hooks/module/register/useRegister";

import styles from "~/styles/ui/Login.module.scss";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

export default function RegisterForm() {
  const { handleSubmit, loading, onSubmit, register, errors } = useRegister();
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className="relative flex">
        <input
          className={`${styles.formControl}`}
          type="text"
          placeholder="Nama"
          {...register("name")}
        />
      </div>
      {errors.name?.message && <p>{errors.name?.message}</p>}
      <div className="relative flex">
        <input
          className={`${styles.formControl}`}
          type="text"
          placeholder="NBI"
          {...register("npm")}
        />
      </div>
      {errors.npm?.message && <p>{errors.npm?.message}</p>}
      <div className="relative flex">
        <input
          className={`${styles.formControl}`}
          type="text"
          placeholder="Email"
          {...register("email")}
        />
      </div>
      {errors.email?.message && <p>{errors.email?.message}</p>}
      <div className={`relative flex`}>
        <input
          className={`${styles.formControl} `}
          type={"password"}
          placeholder="Password"
          {...register("password")}
        />
        <button type="button" className="absolute right-2 top-3">
          <EyeSlashIcon />
        </button>
      </div>
      {errors.password?.message && <p>{errors.password?.message}</p>}
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
  );
}
