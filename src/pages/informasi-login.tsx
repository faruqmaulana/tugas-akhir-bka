/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Email from "~/common/components/svg/Email";
import LockIcon from "~/common/components/svg/Lock";
import { Button } from "~/common/components/ui/button/Button";
import Card from "~/common/components/ui/card/Card";
import Input from "~/common/components/ui/form/Input";
import PageHeading from "~/common/components/ui/header/PageHeading";
import { useGlobalContext } from "~/common/context/GlobalContext";
import {
  type ILoginInformation,
  loginInformation,
} from "~/common/schemas/user/login-information.schema";

const InformasiLogin = () => {
  const {
    state: { user },
  } = useGlobalContext();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInformation>({
    // defaultValues: {
    //   name: user?.name,
    //   email: user?.email,
    //   password: "",
    // },
    resolver: zodResolver(loginInformation),
  });

  useEffect(() => {
    if (user) {
      // Set default values from API response
      Object.entries(user).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [setValue, user]);

  const onSubmit = useCallback(async (data: ILoginInformation) => {
    console.log("data", data);
  }, []);

  const INFORMASI_LOGIN = [
    {
      className: "col-span-1",
      placeholder: "Nama Lengkap",
      label: "Nama Lengkap",
      register: register("name"),
    },
    {
      className: "col-span-1",
      placeholder: "email",
      leftAddonComponent: <Email />,
      label: "Email",
      disabled: true,
      register: register("email"),
    },
    {
      className: "col-span-1",
      placeholder: "Old password",
      leftAddonComponent: <LockIcon />,
      label: "Kata Sandi Lama",
      type: "password",
      autocomplete: "off",
      value: "",
      register: register("password"),
    },
    {
      className: "col-span-1",
      placeholder: "New password",
      leftAddonComponent: <LockIcon />,
      label: "Kata Sandi Baru",
      type: "password",
      autocomplete: "off",
    },
    {
      className: "col-span-1",
      placeholder: "Confirm password",
      leftAddonComponent: <LockIcon />,
      label: "Konfirmasi Kata Sandi",
      type: "password",
      autocomplete: "off",
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
          <Button isSubmit isSuccess isMedium className="col-span-1 ml-auto">
            Simpan
          </Button>
        </Card>
      </form>
    </>
  );
};

export default InformasiLogin;
