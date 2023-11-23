/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/require-await */

import React from "react";
import ArrorLeft from "~/common/components/svg/ArrorLeft";
import { Button } from "~/common/components/ui/button/Button";
import Card from "~/common/components/ui/card/Card";
import BaseForm from "~/common/components/ui/form/BaseForm";
import PageHeading from "~/common/components/ui/header/PageHeading";
import ModalPreviewModule from "~/common/components/ui/modal/ModalPreviewModule";
import { useAddBook } from "~/common/hooks/module/book/useBook";

const Tambah = () => {
  const {
    ADD_FORM,
    onSubmit,
    loading,
    router,
    handleSubmit,
    handleOpenPreview,
    handleClosePreview,
    isPreviewOpen,
  } = useAddBook();

  return (
    <>
      <PageHeading
        title="Form Pengajuan Buku"
        ownButton={
          <Button
            isMedium
            isGray
            className="flex w-fit items-center gap-2"
            onClick={() => {
              void router.push("/module/buku");
            }}
          >
            <ArrorLeft />
            <span>Batal</span>
          </Button>
        }
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mt-[20px]" childClass="flex flex-col gap-4">
          <BaseForm data={ADD_FORM} />
          <div className="flex flex-row justify-end gap-4">
            <ModalPreviewModule
              title="PKM"
              isOpen={isPreviewOpen}
              handleOpen={handleOpenPreview}
              handleClose={handleClosePreview}
              data={ADD_FORM}
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
