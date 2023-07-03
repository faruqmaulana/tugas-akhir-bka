/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Image from "next/image";
import React from "react";
import UntagLogo from "../../../../public/untag.jpg";
import styles from "~/styles/ui/Login.module.scss";
import Universitas from "../../../../public/universitass.jpg";
import Card from "../ui/card/Card";
const AuthLayout = ({ children }: any) => {
  return (
    <>
      <section className={styles.container}>
        <div className={styles.image}>
          <Image
            src={Universitas}
            alt="bumame office"
            fill
            priority
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={`${styles.right} flex flex-col gap-10`}>
          <div className="flex items-center justify-center gap-2">
            <Image
              src={UntagLogo}
              alt="untag-logo"
              width="70"
              height="70"
              placeholder="blur"
              quality={80}
            />
            <div className="h-[50px] border-l border-gray-400"></div>
            <div className="flex flex-col items-center">
              <p className="text-[16px]">Biro Kemahasiswaan dan Alumni</p>
              <p className="text-[16px]">Untag Surabaya</p>
            </div>
          </div>
          {children}
        </div>
      </section>
    </>
  );
};

export { AuthLayout };
