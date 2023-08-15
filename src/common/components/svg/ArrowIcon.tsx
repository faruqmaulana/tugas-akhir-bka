const ArrowIcon = ({
  isOpen = false,
  width = "8",
  height = "6",
  fill = "#17244B",
  className,
}: {
  isOpen?: boolean;
  width?: string;
  height?: string;
  fill?: string;
  className?: string;
}) => {
  return (
    <svg
      className={`transition-all duration-300 ${className || ""} ${
        isOpen ? "rotate-180" : "rotate-0"
      }`}
      width={width}
      height={height}
      viewBox="0 0 8 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.94 0.530029L4 3.58336L7.06 0.530029L8 1.47003L4 5.47003L0 1.47003L0.94 0.530029Z"
        fill={fill}
      />
    </svg>
  );
};

export default ArrowIcon;
