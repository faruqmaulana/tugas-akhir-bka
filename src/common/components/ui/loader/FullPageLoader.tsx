import React from "react";
import Spinner from "../../svg/Spinner";

const FullPageLoader = () => {
  return (
    <div className="flex h-full min-h-[80vh] items-center justify-center">
      <Spinner width="30px" height="30px" />
    </div>
  );
};

export default FullPageLoader;
