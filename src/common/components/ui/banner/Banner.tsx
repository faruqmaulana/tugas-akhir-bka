/* eslint-disable no-unreachable */
import Link from "next/link";
import React, { useEffect, useState } from "react";

export type BannerPropsType = {
  text: string | React.ReactNode;
  isCloseAble?: boolean;
  className?: string;
  redirect: string;
  display: boolean | undefined;
  onClick?: () => void;
};

const Banner = (props: BannerPropsType) => {
  const {
    text,
    isCloseAble = true,
    className,
    redirect,
    display,
    onClick,
  } = props;
  const [isOpen, setIsOpen] = useState<boolean>(display || false);

  useEffect(() => {
    if (typeof display === "boolean") {
      setIsOpen(display);
    }
  }, [display]);

  return (
    <div
      className={`flex w-full flex-row items-center gap-2 px-5 py-3 sm:px-10 ${
        className || ""
      }`}
      style={{
        maxHeight: isOpen ? "1000px" : "0",
        opacity: isOpen ? 1 : 0,
        padding: isOpen ? "" : 0,
        transition: "max-height 0.5s ease-out, opacity 0.5s ease-out",
      }}
    >
      {isOpen && (
        <Link
          href={redirect && isOpen ? redirect : "#"}
          className="mx-auto text-center text-base font-medium hover:cursor-pointer md:font-semibold"
        >
          {text}
        </Link>
      )}
      {isCloseAble && (
        <button
          type="button"
          style={{
            maxHeight: isOpen ? "1000px" : "0",
            opacity: isOpen ? 1 : 0,
            padding: isOpen ? "" : 0,
            transition: "max-height 0.5s ease-out, opacity 0.5s ease-out",
          }}
          onClick={() => {
            setIsOpen(false);
            if (onClick) return onClick();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Banner;
