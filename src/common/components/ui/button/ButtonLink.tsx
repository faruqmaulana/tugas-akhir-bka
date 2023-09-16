import { ExternalLink } from "lucide-react";
import React from "react";

const ButtonLink = () => {
  return (
    <div className="flex flex-row items-center gap-1 rounded-full border border-slate-400 bg-slate-100 px-3 py-1 text-xs hover:bg-slate-200">
      <ExternalLink size={14} />
      <p className="text-xs">Link</p>
    </div>
  );
};

export default ButtonLink;
