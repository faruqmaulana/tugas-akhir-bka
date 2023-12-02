/* eslint-disable @typescript-eslint/no-misused-promises */
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";
import GoogleLogo from "../../../../../public/google.png";
const GoogleButton = ({ text }: { text: string }) => {
  return (
    <button
      data-cy="auth-provider-button"
      className="relative inline-flex h-10 w-full items-center justify-center rounded-md border border-gray-400 bg-white text-sm font-medium text-gray-600 outline-none ring-offset-1 ring-offset-background transition-all hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-none active:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 [&>*]:px-4 [&>*]:py-2 active:[&>*]:translate-y-0.5"
      data-provider="google.com"
      onClick={() =>
        signIn("google", {
          callbackUrl: "/",
          // redirect: true,
        })
      }
    >
      <span className="flex h-full w-full items-center transition-transform duration-500 ease-out">
        <span className="flex w-full flex-1 items-center justify-center">
          <span className="absolute left-3 flex items-center justify-start">
            <Image
              alt="google-provider"
              width={20}
              quality={100}
              src={GoogleLogo}
            />
          </span>
          <span className="flex w-full flex-1 items-center">
            <span className="flex w-full items-center justify-center">
              <span className="font-semibold">{text}</span>
            </span>
          </span>
        </span>
      </span>
    </button>
  );
};

export default GoogleButton;
