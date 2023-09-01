import React from "react";
import EmptyData from "./EmptyData";
import PageHeading from "../header/PageHeading";
import Card from "../card/Card";

const EmptyModulePageData = () => {
  return (
    <>
      <PageHeading />
      <Card className="flex flex-col gap-5">
        <EmptyData />
      </Card>
    </>
  );
};

export default EmptyModulePageData;
