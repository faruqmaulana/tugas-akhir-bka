import React, { useState } from "react";
import Card from "./Card";
import ModuleCardInfo, { type ModuleCardInfoType } from "./ModuleCardInfo";

const ExpandableCard = ({
  children,
  status = undefined,
  setIsDrawerOpen,
  dokumenTitle,
}: { children: React.ReactNode } & ModuleCardInfoType) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      className={`mx-auto mt-[20px] transition-all ease-in-out ${
        isExpanded
          ? "w-[75%] rounded-lg border border-gray-300 shadow-xl duration-500"
          : "w-full duration-300"
      }`}
    >
      {status && setIsDrawerOpen && (
        <ModuleCardInfo
          status={status}
          setIsDrawerOpen={setIsDrawerOpen}
          setIsExpanded={setIsExpanded}
          isExpanded={isExpanded}
          dokumenTitle={dokumenTitle}
        />
      )}
      {children}
    </Card>
  );
};

export default ExpandableCard;
