/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/require-await */
import Email from "~/common/components/svg/Email";
import LockIcon from "~/common/components/svg/Lock";
import { Button } from "~/common/components/ui/button/Button";
import Card from "~/common/components/ui/card/Card";
import Input from "~/common/components/ui/form/Input";
import PageHeading from "~/common/components/ui/header/PageHeading";
import { useLoginInformation } from "~/common/hooks/module/profile/useLoginInformation";

const InformasiLogin = () => {
  const { register, handleSubmit, errors, onSubmit, loading } =
    useLoginInformation();

  const INFORMASI_LOGIN = [
    {
      className: "col-span-1",
      placeholder: "email",
      leftAddonComponent: <Email />,
      label: "Email",
      disabled: true,
      register: { ...register("email") },
    },
    {
      className: "col-span-1",
      placeholder: "Old password",
      leftAddonComponent: <LockIcon />,
      label: "Kata Sandi Lama",
      type: "password",
      autocomplete: "off",
      value: "",
      register: { ...register("password") },
      error: errors.requireOldPassword?.message,
    },
    {
      className: "col-span-1",
      placeholder: "New password",
      leftAddonComponent: <LockIcon />,
      label: "Kata Sandi Baru",
      type: "password",
      autocomplete: "off",
      register: { ...register("newPassword") },
      error: errors.customErrorPassword?.message,
    },
    {
      className: "col-span-1",
      placeholder: "Confirm password",
      leftAddonComponent: <LockIcon />,
      label: "Konfirmasi Kata Sandi",
      type: "password",
      autocomplete: "off",
      register: { ...register("passwordConfirmation") },
      error: errors.customErrorPassword?.message,
    },
  ];

  return (
    <>
      <PageHeading />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="bg-grey mx-auto grid h-fit w-full grid-cols-2 gap-5 rounded-md p-5 shadow-md md:w-4/5 md:p-8 lg:w-3/5 xl:w-2/5">
          {INFORMASI_LOGIN.map((val, index) => (
            <Input key={index} {...val} />
          ))}
          <Button
            isSubmit
            isSuccess
            isMedium
            isLoading={loading}
            className="col-span-1 ml-auto"
          >
            Simpan
          </Button>
        </Card>
      </form>
    </>
  );
};

export default InformasiLogin;
