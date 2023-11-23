/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { customToast } from "~/common/components/ui/toast/showToast";

import { api } from "~/utils/api";
import { useRouter } from "next/router";

import { handleUploadCloudinary } from "~/common/libs/handle-upload-cloudinary";
import { JSONtoString } from "~/common/helpers/parseJSON";
import { useMainLayout } from "../../layout/useMainLayout";

import {
  type ICreateBookForm,
  createBookSchema,
} from "~/common/schemas/module/pengajuan/book/create-book.schema";
const useAddBook = () => {
  const { refetchNotification } = useMainLayout();

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const { mutate: addData } = api.bookModule.addBook.useMutation();

  const {
    register,
    trigger,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ICreateBookForm>({
    resolver: zodResolver(createBookSchema),
  });

  const onSubmit = useCallback(async (userPayload: ICreateBookForm) => {
    setLoading(true);
    const uploadDokumenPendukungPromise = handleUploadCloudinary({
      file: userPayload?.dokumenPendukung?.[0] as File,
    });

    const [uploadProposal] = await Promise.all([uploadDokumenPendukungPromise]);

    const dokumenPendukung = JSONtoString(uploadProposal);

    addData(
      { ...userPayload, dokumenPendukung },
      {
        onSuccess: async (data) => {
          customToast("success", data?.message);
          setLoading(false);
          await refetchNotification();
          void router.push("/module/buku");
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

  const ADD_FORM = [
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Judul",
      label: "Judul Buku",
      register: { ...register("judulBuku") },
      error: errors.judulBuku?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Pengarang",
      label: "Pengarang",
      register: { ...register("pengarang") },
      error: errors.pengarang?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Penulis",
      label: "Penulis",
      register: { ...register("penulis") },
      error: errors.penulis?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Penerbit",
      label: "Penerbit",
      register: { ...register("penerbit") },
      error: errors.penerbit?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Jumlah Eksemplar",
      label: "Jumlah Eksemplar",
      register: { ...register("jumlahEksemplar") },
      error: errors.jumlahEksemplar?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Dokumen Pendukung",
      type: "file",
      label: "Upload Dokumen Pendukung",
      register: { ...register("dokumenPendukung") },
      error: errors.dokumenPendukung?.message,
    },
  ];

  return {
    ADD_FORM,
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

export { useAddBook };
