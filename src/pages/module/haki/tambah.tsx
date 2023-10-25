/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import ArrorLeft from "~/common/components/svg/ArrorLeft";
import { Button } from "~/common/components/ui/button/Button";
import Card from "~/common/components/ui/card/Card";
import BaseForm from "~/common/components/ui/form/BaseForm";
import PageHeading from "~/common/components/ui/header/PageHeading";
import { useAddHaki } from "~/common/hooks/module/haki/useAddHaki";

const Tambah = () => {
  const { ADD_HAKI_FORM, handleSubmit, loading, onSubmit, router } =
    useAddHaki();

  return (
    <>
      <PageHeading
        title="Form Pengajuan Haki"
        ownButton={
          <Button
            isMedium
            isGray
            className="flex w-fit items-center gap-2"
            onClick={() => {
              void router.push("/module/haki");
            }}
          >
            <ArrorLeft />
            <span>Batal</span>
          </Button>
        }
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mt-[20px]" childClass="flex flex-col">
          <BaseForm data={ADD_HAKI_FORM} />
          <Button
            isLarge
            isSubmit
            isSuccess
            isMedium
            isLoading={loading}
            className="ml-auto mt-5"
          >
            Submit
          </Button>
        </Card>
      </form>
    </>
  );
};

export default Tambah;
