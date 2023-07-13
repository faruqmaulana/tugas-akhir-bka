import { useRouter } from "next/router";
import EditIcon from "~/common/components/svg/EditIcon";
import { Button } from "~/common/components/ui/button/Button";
import Card from "~/common/components/ui/card/Card";
import PageHeading from "~/common/components/ui/header/PageHeading";
import Modal from "~/common/components/ui/modal/Modal";

const Example = () => {
  const router = useRouter();
  return (
    <>
      <PageHeading />
      <div className="flex flex-col gap-5">
        <Card header="Syarat dan Ketentuan Pengajuan Beasiswa">
          <div>
            Pengajuan beasiswa hanya bisa dilakukan pada mahasiswa aktif
            Universitas 17 Agustus 1945 Surabaya
          </div>
          <p className="mt-5 font-bold">1. Syarat Akademik</p>
          <p>- Mahasiswa memiliki prestasi dalam bidang akademik</p>
          <p>- Mahasiswa harus mempunyai IPK minimal 3.0</p>
          <p className="mt-5 font-bold">2. Syarat Akademik</p>
          <p>- Mahasiswa memiliki prestasi dalam bidang akademik</p>
          <p>- Mahasiswa harus mempunyai IPK minimal 3.0</p>
          <p className="mt-5 text-red-500">
            **Note: Syarat dan ketentuan ini akan ditampilkan ketika mahasiswa
            mengajukan beasiswa
          </p>
        </Card>
        <Card header="Template Formulir Pengajuan Beasiswa">
          <iframe
            className="mt-5 h-[600px]"
            src="https://www.buds.com.ua/images/Lorem_ipsum.pdf"
          ></iframe>
          <p className="mt-5 text-red-500">
            **Note: Template formulir ini digunakan ketika mahasiswa mengajukan
            beasiswa
          </p>
        </Card>
        <Button
          title="Edit Dokumen"
          isMedium
          isSecondary
          className="ml-auto flex w-fit items-center gap-2 text-center"
          onClick={() => {
            void router.push("/master-data/beasiswa/edit");
          }}
        >
          <EditIcon />
          <span>Edit</span>
        </Button>
      </div>
      <Modal isOpen={false} content="asd"></Modal>
    </>
  );
};

export default Example;
