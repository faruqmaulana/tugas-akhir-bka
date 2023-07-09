import { Button } from "~/common/components/ui/button/Button";
import Card from "~/common/components/ui/card/Card";
import Input from "~/common/components/ui/form/Input";

export const INFORMASI_LOGIN = [
  {
    className: "col-span-2 lg:col-span-1",
    placeholder: "Nama Mahasiwa",
    label: "Nama Lengkap",
  },
  {
    className: "col-span-2 lg:col-span-1",
    placeholder: "Nomor Induk Mahasiswa",
    label: "NBI",
  },
  {
    className: "col-span-2 lg:col-span-1",
    placeholder: "Fakultas",
    label: "Fakultas",
    type: "select",
    value: "Teknik",
    disabled: true,
    selectData: [
      {
        id: "teknik",
        title: "Teknik",
      },
      {
        id: "kedokteran",
        title: "Kedokteran",
      },
    ],
  },
  {
    className: "col-span-2 lg:col-span-1",
    placeholder: "Prodi",
    label: "Prodi",
    type: "select",
    value: "Teknik Informatika",
    selectData: [
      {
        id: "teknik-informatika",
        title: "Teknik Informatika",
      },
      {
        id: "teknik-mesin",
        title: "Teknik Mesin",
      },
    ],
  },
  {
    className: "col-span-2 lg:col-span-1",
    placeholder: "ex: 8386657199",
    leftAddonComponent: "+62",
    label: "No Telepon",
    additionalInfo: "No Telepon yang aktif memakai Whatsapp",
  },
  {
    className: "col-span-2 lg:col-span-1",
    placeholder: "Semester",
    label: "Semester",
  },
  {
    className: "col-span-2 lg:mt-3",
    placeholder: "Alamat Lengkap",
    label: "Alamat Lengkap",
    type: "textarea",
  },
];
const InformasiLogin = () => {
  return (
    <form className="">
      <Card header="Informasi Profile" headerClassName="mb-5">
        <div className="mx-auto mb-5 grid h-fit w-full grid-cols-2 gap-5">
          {INFORMASI_LOGIN.map((val) => (
            <Input key={val.label} {...val} />
          ))}
        </div>
        <Button isSubmit isSuccess isMedium className="col-span-1 ml-auto">
          Simpan
        </Button>
      </Card>
    </form>
  );
};

export default InformasiLogin;
