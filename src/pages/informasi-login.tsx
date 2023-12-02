/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/require-await */
import { requireAuth } from "~/common/authentication/requireAuth";
import Email from "~/common/components/svg/Email";
import LockIcon from "~/common/components/svg/Lock";
import { Button } from "~/common/components/ui/button/Button";
import Input from "~/common/components/ui/form/Input";
import PageHeading from "~/common/components/ui/header/PageHeading";
import { useGlobalContext } from "~/common/context/GlobalContext";
import { useLoginInformation } from "~/common/hooks/module/profile/useLoginInformation";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const InformasiLogin = () => {
  const { register, handleSubmit, errors, onSubmit, loading } =
    useLoginInformation();

  const {
    state: { user },
  } = useGlobalContext();
  const isGoogleProvider = user?.accounts?.[0]?.provider === "google";

  const INFORMASI_LOGIN = [
    {
      className: "col-span-2",
      placeholder: "email",
      leftAddonComponent: <Email />,
      label: "Email",
      disabled: true,
      register: { ...register("email") },
    },
    {
      disabled: isGoogleProvider,
      className: "col-span-2",
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
      disabled: isGoogleProvider,
      className: "col-span-2",
      placeholder: "New password",
      leftAddonComponent: <LockIcon />,
      label: "Kata Sandi Baru",
      type: "password",
      autocomplete: "off",
      register: { ...register("newPassword") },
      error: errors.customErrorPassword?.message,
    },
    {
      disabled: isGoogleProvider,
      className: "col-span-2",
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
      <form
        className="mx-auto grid h-fit w-full grid-cols-2 gap-5 rounded-md bg-white p-5 shadow-md md:w-4/5 md:p-8 lg:w-3/5 xl:w-2/5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {INFORMASI_LOGIN.map((val, index) => (
          <Input {...val} key={index} />
        ))}
        <Button
          isSubmit
          isSuccess
          isMedium
          isLoading={loading}
          className="col-span-2 ml-auto"
        >
          Simpan
        </Button>
      </form>
    </>
  );
};

export default InformasiLogin;
