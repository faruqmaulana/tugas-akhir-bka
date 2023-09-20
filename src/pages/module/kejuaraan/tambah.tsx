/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/require-await */
import React from "react";
import { requireAuth } from "~/common/authentication/requireAuth";
import ArrorLeft from "~/common/components/svg/ArrorLeft";
import { Button } from "~/common/components/ui/button/Button";
import Card from "~/common/components/ui/card/Card";
import BaseForm from "~/common/components/ui/form/BaseForm";
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mt-[20px]" childClass="flex flex-col">
          <BaseForm data={KEJUARAAN_FORM} />
          <Button
            isLarge
            isSubmit
            isSuccess
            isMedium
            isLoading={loading}
            className="ml-auto"
          >
            Submit
          </Button>
        </Card>
      </form>
    </>
  );
};

export default TambahKejuaraan;
