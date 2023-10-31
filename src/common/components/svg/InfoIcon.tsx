import React from "react";

const InfoIcon = ({
  className,
  title = "Detail Info",
  width = "16",
  height = "16",
}: {
  className?: string;
  title?: string;
  width?: string;
  height?: string;
}) => {
  return (
    <div
      title={title}
      className={`rounded-full border border-primary bg-primary p-[2px] ${
        className || ""
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill="#FFFFFF"
        className="bi bi-info-lg"
        viewBox="0 0 16 16"
      >
        <path d="m9.708 6.075-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704l1.323-6.208Zm.091-2.755a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0Z" />
      </svg>
    </div>
  );
};

export default InfoIcon;
