import Email from "~/common/components/svg/Email";
import LockIcon from "~/common/components/svg/Lock";
import { Button } from "~/common/components/ui/button/Button";
import Card from "~/common/components/ui/card/Card";
import Input from "~/common/components/ui/form/Input";
import PageHeading from "~/common/components/ui/header/PageHeading";

const InformasiLogin = () => {
  const INFORMASI_LOGIN = [
    {
      className: "col-span-1",
      placeholder: "Username",
      label: "Username",
    },
    {
      className: "col-span-1",
      placeholder: "email",
      leftAddonComponent: <Email />,
      label: "Email",
      disabled: true,
    },
    {
      className: "col-span-1",
      placeholder: "Old password",
      leftAddonComponent: <LockIcon />,
      label: "Kata Sandi Lama",
      type: "password",
    },
    {
      className: "col-span-1",
      placeholder: "New password",
      leftAddonComponent: <LockIcon />,
      label: "Kata Sandi Baru",
      type: "password",
    },
    {
      className: "col-span-1",
      placeholder: "Confirm password",
      leftAddonComponent: <LockIcon />,
      label: "Konfirmasi Kata Sandi",
      type: "password",
    },
  ];

  return (
    <>
      <PageHeading />
      <form className="">
        <Card className="bg-grey mx-auto grid h-fit w-full grid-cols-2 gap-5 rounded-md p-5 shadow-md md:w-4/5 md:p-8 lg:w-3/5 xl:w-2/5">
          {INFORMASI_LOGIN.map((val) => (
            <Input key={val.label} {...val} />
          ))}
          <Button isSubmit isSuccess isMedium className="col-span-1 ml-auto">
            Simpan
          </Button>
        </Card>
      </form>
    </>
  );
};

export default InformasiLogin;
