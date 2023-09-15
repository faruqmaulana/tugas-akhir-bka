import { ExternalLink } from "lucide-react";
import React from "react";

const ButtonLink = () => {
  return (
    <div className="flex flex-row items-center gap-1 rounded-full border border-gray-400 bg-gray-200 px-3 py-1 text-xs">
      <ExternalLink size={15} />
      <p className="text-xs font-semibold">Link</p>
    </div>
  );
};

export default ButtonLink;
