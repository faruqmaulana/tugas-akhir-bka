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
import { useAddHaki } from "~/common/hooks/module/haki/useAddHaki";
import { PatenAndHaki } from "@prisma/client";

export const getServerSideProps = requireAuth(async (_ctx) => {
  return { props: {} };
});

const Tambah = () => {
  const {
    ADD_HAKI_FORM,
    handleSubmit,
    loading,
    onSubmit,
    router,
    handleOpenPreview,
    handleClosePreview,
    isPreviewOpen,
  } = useAddHaki({ jenis: PatenAndHaki.PATEN });

  return (
    <>
      <PageHeading
        title="Form Pengajuan Paten"
        ownButton={
          <Button
            isMedium
            isGray
            className="flex w-fit items-center gap-2"
            onClick={() => {
              void router.push("/module/paten");
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
          <div className="flex flex-row justify-end gap-4">
            <ModalPreviewModule
              title="Paten"
              isOpen={isPreviewOpen}
              handleOpen={handleOpenPreview}
              handleClose={handleClosePreview}
              data={ADD_HAKI_FORM}
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

export default Tambah;
