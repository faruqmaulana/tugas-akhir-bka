/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Link from "next/link";
import EyeSlashIcon from "~/common/EyeSlashIcon";
import { Button } from "~/common/components/ui/button/Button";

import styles from "~/styles/ui/Login.module.scss";

export default function LoginForm() {
  return (
    <>
      <form className={styles.form}>
        <div className="relative flex">
          <input
            className={`${styles.formControl}`}
            type="text"
            placeholder="NBI"
          />
        </div>
        <div className={`relative flex`}>
          <input
            className={`${styles.formControl} `}
            type={"password"}
            placeholder="Password"
          />
          <button type="button" className="absolute right-2 top-3">
            <EyeSlashIcon />
          </button>
        </div>
        <div className="flex flex-col">
          <div className={styles.forgotPassword}>
            <Link href="/forgot-password" className={styles.forgot}>
              Lupa Password?
            </Link>
          </div>
          <Link href="/dashboard">
            <div className={styles.formButton}>
              <Button
                isPrimary
                isSubmit
                isMedium
                isUppercase
                className="w-full"
              >
                Login
              </Button>
            </div>
          </Link>
          <div className={`${styles.forgotPassword} mt-1`}>
            Belum punya akun? &nbsp;
            <Link href="/register" className={styles.forgot}>
              Daftar di sini
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
