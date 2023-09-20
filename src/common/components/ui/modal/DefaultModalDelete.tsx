import React from "react";
import { DATA_CANT_RECOVER } from "~/common/constants/MESSAGE/index";
import { useHeadingTitle } from "~/common/hooks/useHeading";

const DefaultModalDelete = ({
  module,
  detailInfo,
}: {
  module?: string;
  detailInfo?: string;
}) => {
  const { moduleName } = useHeadingTitle();

  return (
    <div className="flex flex-col items-center justify-center">
      {detailInfo && (
        <h1 className="mb-2 text-lg font-semibold">Menghapus {detailInfo}</h1>
      )}
      {/* <p className="text-base">
        {module || moduleName} {DATA_CANT_RECOVER}
      </p> */}
    </div>
  );
};

export default DefaultModalDelete;
