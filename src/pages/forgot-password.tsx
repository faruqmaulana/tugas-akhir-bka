/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Link from "next/link";
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
            placeholder="Email Address"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className={styles.formButton}>
            <Button isPrimary isSubmit isMedium isUppercase className="w-full">
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
