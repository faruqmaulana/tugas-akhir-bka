/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import ArrorLeft from "~/common/components/svg/ArrorLeft";
import { Button } from "~/common/components/ui/button/Button";
import SubmitButton from "~/common/components/ui/button/SubmitButton";
import Card from "~/common/components/ui/card/Card";
import BaseForm from "~/common/components/ui/form/BaseForm";
import PageHeading from "~/common/components/ui/header/PageHeading";
import { useAddScholarship } from "~/common/hooks/module/beasiswa/useAddScholarship";

const AddScolarship = () => {
  const { ADD_SCHOLARSHIP_FORM, handleSubmit, onSubmit, loading } =
    useAddScholarship();

  return (
    <>
      <PageHeading
        title="Form Pengajuan Beasiswa"
        ownButton={
          <Button isMedium isGray className="flex w-fit items-center gap-2">
            <ArrorLeft />
            <span>Batal</span>
          </Button>
        }
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mt-[20px]">
          <BaseForm data={ADD_SCHOLARSHIP_FORM} />
          <SubmitButton loading={loading} />
        </Card>
      </form>
    </>
  );
};

export default AddScolarship;
