/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/require-await */
import React from "react";
import { requireAuth } from "~/common/authentication/requireAuth";
import ArrorLeft from "~/common/components/svg/ArrorLeft";
import { Button } from "~/common/components/ui/button/Button";
import Card from "~/common/components/ui/card/Card";
import BaseForm from "~/common/components/ui/form/BaseForm";
import PageHeading from "~/common/components/ui/header/PageHeading";
import ModalPreviewModule from "~/common/components/ui/modal/ModalPreviewModule";
import { useKejuaraan } from "~/common/hooks/module/kejuaraan/useKejuaraan";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const TambahKejuaraan = () => {
  const {
    KEJUARAAN_FORM,
    handleSubmit,
    onSubmit,
    loading,
    handleOpenPreview,
    handleClosePreview,
    isPreviewOpen,
  } = useKejuaraan();

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
          <div className="flex flex-row justify-end gap-4">
            <ModalPreviewModule
              title="Prestasi Lomba & Kejuaraan"
              isOpen={isPreviewOpen}
              handleOpen={handleOpenPreview}
              handleClose={handleClosePreview}
              data={KEJUARAAN_FORM}
            />
            <Button isLarge isSubmit isSuccess isMedium isLoading={loading}>
              Submit
            </Button>
          </div>
        </Card>
      </form>
    </>
  );
};

export default TambahKejuaraan;
