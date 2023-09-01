import React from "react";

const EmptyData = ({ className }: { className?: string }) => {
  return <div className={`m-auto ${className || ""}`}>Data masih kosong</div>;
};

export default EmptyData;
