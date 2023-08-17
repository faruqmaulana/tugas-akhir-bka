/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/require-await */
import React from "react";
import { requireAuth } from "~/common/authentication/requireAuth";
import ArrorLeft from "~/common/components/svg/ArrorLeft";
import { Button } from "~/common/components/ui/button/Button";
import Card from "~/common/components/ui/card/Card";
import Input from "~/common/components/ui/form/Input";
import PageHeading from "~/common/components/ui/header/PageHeading";
import { useKejuaraan } from "~/common/hooks/module/kejuaraan/useKejuaraan";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const TambahKejuaraan = () => {
  const { KEJUARAAN_FORM, handleSubmit, onSubmit, loading } = useKejuaraan();

  return (
    <>
      <PageHeading
        title="Form Pengajuan Prestasi Lomba & Kejuaraan"
        ownButton={
          <Button isMedium isGray className="flex w-fit items-center gap-2">
            <ArrorLeft />
            <span>Batal</span>
          </Button>
        }
      />
      <Card className="mt-[20px]">
        <form
          className="mx-auto mb-5 grid h-fit w-full grid-cols-2 gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          {KEJUARAAN_FORM.map((val) => (
            <Input key={val.label} {...val} />
          ))}
        </form>
        <Button isMedium isSuccess className="flex w-fit items-center gap-2">
          Submit
        </Button>
      </Card>
    </>
  );
};

export default TambahKejuaraan;
