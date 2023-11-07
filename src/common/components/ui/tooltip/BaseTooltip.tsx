import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const BaseTooltip = ({
  children,
  title,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  title: string;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={className}
          onClick={() => {
            if (onClick) return onClick();
          }}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent className="border border-gray-400 shadow-lg">
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BaseTooltip;
