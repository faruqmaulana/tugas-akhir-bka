/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { customToast } from "~/common/components/ui/toast/showToast";

import { api } from "~/utils/api";
import { useRouter } from "next/router";
import {
  type IHakiApplicationSchema,
  hakiApplicationSchema,
} from "~/common/schemas/module/pengajuan/haki/haki-application.schema";
import { useMultiSelectUser } from "../global/useMultiSelectUser";
import { handleUploadCloudinary } from "~/common/libs/handle-upload-cloudinary";
import { JSONtoString } from "~/common/helpers/parseJSON";
import { useMainLayout } from "../../layout/useMainLayout";

const useAddHaki = (defaultSelected: any | undefined = undefined) => {
  const { refetchNotification } = useMainLayout();

  const {
    mahasiswa,
    mahasiswaPayload,
    handleDeleteSelectedMahasiswa,
    handleSelectMultipleUser,
  } = useMultiSelectUser(defaultSelected);

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate: addHakiApplication } =
    api.hakiModule.addHakiApplication.useMutation();

  const {
    register,
    trigger,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IHakiApplicationSchema>({
    resolver: zodResolver(hakiApplicationSchema),
  });

  const onSubmit = useCallback(async (userPayload: IHakiApplicationSchema) => {
    setLoading(true);
    const uploadTemplateFormulirPromise = handleUploadCloudinary({
      file: userPayload?.dokumenPendukung?.[0] as File,
    });

    const [uploadTemplateFormulir] = await Promise.all([
      uploadTemplateFormulirPromise,
    ]);

    const dokumenPendukung = JSONtoString(uploadTemplateFormulir);

    addHakiApplication(
      { ...userPayload, dokumenPendukung },
      {
        onSuccess: async (data) => {
          customToast("success", data?.message);
          setLoading(false);
          await refetchNotification();
          void router.push("/module/haki");
        },
        onError: (error) => {
          customToast("error", error?.message);
          setLoading(false);
        },
      }
    );
  }, []);

  useEffect(
    () => setValue("users", mahasiswaPayload),
    [mahasiswaPayload, setValue]
  );

  const ADD_HAKI_FORM = [
    {
      trigger: trigger,
      className: "col-span-2",
      placeholder: "Judul",
      label: "Judul",
      register: { ...register("judul") },
      error: errors.judul?.message,
    },
    {
      trigger: trigger,
      type: "textarea",
      label: "Deskripsi",
      placeholder: "Contoh: karya musik, buku, atau karya seni visual",
      className: "col-span-2",
      register: { ...register("keterangan") },
      error: errors.keterangan?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2",
      placeholder: "Dokumen Pendukung",
      type: "file",
      label: "Upload Dokumen Pendukung",
      register: { ...register("dokumenPendukung") },
      error: errors.dokumenPendukung?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2",
      placeholder: "Pemegang Paten",
      label: "Pemegang Paten",
      type: "select",
      control: control,
      selectData: mahasiswa,
      register: { ...register("users") },
      error: errors.users?.message,
      selectedData: mahasiswaPayload,
      // handleSwitch: handleMahasiswaLead,
      handleDeleteSelectedData: handleDeleteSelectedMahasiswa,
      handleSelectMultipleUser: handleSelectMultipleUser,
      formFlag: "IS_MUTIPLE_SELECT_MAHASISWA_FORM",
    },
  ];

  return {
    ADD_HAKI_FORM,
    onSubmit,
    loading,
    router,
    register,
    trigger,
    handleSubmit,
    control,
    setValue,
    errors,
  };
};

export { useAddHaki };
