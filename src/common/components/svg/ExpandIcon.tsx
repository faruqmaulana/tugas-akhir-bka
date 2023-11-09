import React, { useState } from "react";
import BaseTooltip from "../ui/tooltip/BaseTooltip";

const ExpandIcon = ({ onClick }: { onClick?: () => void }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    if (onClick) return onClick();
  };

  return (
    <BaseTooltip
      className="hidden md:block"
      onClick={handleClick}
      title="Resize view"
    >
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-md p-[6px] hover:bg-gray-200 ${
          isExpanded ? "bg-gray-200" : ""
        }`}
      >
        <svg
          className="rotate-45"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 20H19C19.55 20 20 20.45 20 21C20 21.55 19.55 22 19 22H5C4.45 22 4 21.55 4 21C4 20.45 4.45 20 5 20ZM5 2H19C19.55 2 20 2.45 20 3C20 3.55 19.55 4 19 4H5C4.45 4 4 3.55 4 3C4 2.45 4.45 2 5 2ZM13 9H14.79C15.24 9 15.46 8.46 15.14 8.15L12.35 5.36C12.15 5.16 11.84 5.16 11.64 5.36L8.85 8.15C8.54 8.46 8.76 9 9.21 9H11V15H9.21C8.76 15 8.54 15.54 8.86 15.85L11.65 18.64C11.85 18.84 12.16 18.84 12.36 18.64L15.15 15.85C15.46 15.54 15.24 15 14.8 15H13V9Z"
            fill="black"
          />
        </svg>
      </div>
    </BaseTooltip>
  );
};

export default ExpandIcon;