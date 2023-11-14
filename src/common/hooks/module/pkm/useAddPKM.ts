/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { customToast } from "~/common/components/ui/toast/showToast";

import { api } from "~/utils/api";
import { useRouter } from "next/router";

import { useMultiSelectUser } from "../global/useMultiSelectUser";
import { handleUploadCloudinary } from "~/common/libs/handle-upload-cloudinary";
import { JSONtoString } from "~/common/helpers/parseJSON";
import { useMainLayout } from "../../layout/useMainLayout";

import {
  type IcreatePKMSchema,
  createPKMSchema,
} from "~/common/schemas/module/pengajuan/pkm/create-pkm.shema";
const useAddPKM = () => {
  const { refetchNotification } = useMainLayout();

  const {
    mahasiswa,
    mahasiswaPayload,
    handleDeleteSelectedMahasiswa,
    handleSelectMultipleUser,
    handleMahasiswaLead,
  } = useMultiSelectUser();

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const { data: dosen } = api.lecturer.getAllDosen.useQuery();
  const { mutate: addHakiApplication } =
    api.pkmModule.addPKMApplication.useMutation();

  const {
    register,
    trigger,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IcreatePKMSchema>({
    resolver: zodResolver(createPKMSchema),
  });

  const onSubmit = useCallback(async (userPayload: IcreatePKMSchema) => {
    setLoading(true);
    const uploadProposalPromise = handleUploadCloudinary({
      file: userPayload?.dokumenProposal?.[0] as File,
    });

    const [uploadProposal] = await Promise.all([uploadProposalPromise]);

    const dokumenProposal = JSONtoString(uploadProposal);

    addHakiApplication(
      { ...userPayload, dokumenProposal },
      {
        onSuccess: async (data) => {
          customToast("success", data?.message);
          setLoading(false);
          await refetchNotification();
          void router.push("/module/pkm");
        },
        onError: (error) => {
          customToast("error", error?.message);
          setLoading(false);
        },
      }
    );
  }, []);

  const handleOpenPreview = () => setIsPreviewOpen(true);
  const handleClosePreview = () => setIsPreviewOpen(false);

  useEffect(
    () => setValue("users", mahasiswaPayload),
    [mahasiswaPayload, setValue]
  );

  const ADD_PKM_FORM = [
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Mahasiswa",
      label: "Nama",
      type: "select",
      control: control,
      selectData: mahasiswa,
      register: { ...register("users") },
      error: errors.users?.message,
      selectedData: mahasiswaPayload,
      handleSwitch: handleMahasiswaLead,
      handleDeleteSelectedData: handleDeleteSelectedMahasiswa,
      handleSelectMultipleUser: handleSelectMultipleUser,
      formFlag: "IS_MUTIPLE_SELECT_MAHASISWA_FORM",
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Dosen",
      label: "Dosen",
      type: "select",
      control: control,
      selectData: dosen,
      register: { ...register("dosenId") },
      error: errors.dosenId?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Judul",
      label: "Judul",
      register: { ...register("judul") },
      error: errors.judul?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Tanggal Kegiatan",
      label: "Tanggal Kegiatan",
      value: new Date(), // Contoh dummy data untuk tanggal kegiatan.
      type: "date",
      control: control,
      register: { ...register("tanggalKegiatan") },
      error: errors.tanggalKegiatan?.message,
    },
    {
      trigger: trigger,
      type: "textarea",
      label: "Deskripsi",
      placeholder: "Deskripsi singkat dari kegiatan PKM yang diajuakan",
      className: "col-span-2",
      register: { ...register("deskripsi") },
      error: errors.deskripsi?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2",
      placeholder: "Dokumen Pendukung",
      type: "file",
      label: "Upload Proposal PKM",
      register: { ...register("dokumenProposal") },
      error: errors.dokumenProposal?.message,
    },
  ];

  return {
    ADD_PKM_FORM,
    onSubmit,
    loading,
    router,
    register,
    trigger,
    handleSubmit,
    control,
    setValue,
    errors,
    handleOpenPreview,
    handleClosePreview,
    isPreviewOpen,
  };
};

export { useAddPKM };
