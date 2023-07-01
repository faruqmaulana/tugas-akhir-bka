import React from "react";
import Spinner from "../../svg/Spinner";

const Loader = () => {
  return (
    <div className="flex h-[150px] items-center justify-center">
      <Spinner width="30px" height="30px" />
    </div>
  );
};

export default Loader;
