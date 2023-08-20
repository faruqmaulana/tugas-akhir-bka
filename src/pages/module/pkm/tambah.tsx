import React from "react";
import ArrorLeft from "~/common/components/svg/ArrorLeft";
import { Button } from "~/common/components/ui/button/Button";
import Card from "~/common/components/ui/card/Card";
import PageHeading from "~/common/components/ui/header/PageHeading";
import PengajuanForm from "~/common/components/ui/page/status-pengajuan/PengajuanForm";
import { PKM_FORM } from "~/common/constants/DUMMY_PKM";

const tambah = () => {
  return (
    <>
      <PageHeading
        title="Form Pengajuan Program Kreativitas Mahasiswa"
        ownButton={
          <Button isMedium isGray className="flex w-fit items-center gap-2">
            <ArrorLeft />
            <span>Batal</span>
          </Button>
        }
      />
      <Card className="mt-[20px]">
        <PengajuanForm data={PKM_FORM} />
        <Button isMedium isSuccess className="flex w-fit items-center gap-2">
          <span>Submit</span>
        </Button>
      </Card>
    </>
  );
};

export default tambah;
