/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "~/common/components/ui/card/Card";
import BaseForm from "~/common/components/ui/form/BaseForm";
import { Button } from "~/common/components/ui/button";
import {
  type IuploadFileForm,
  uploadFileForm,
} from "~/common/schemas/module/pengajuan/pengajuan-prestasi.shema";
import { handleUploadCloudinary } from "~/common/libs/handle-upload-cloudinary";
const UploadForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IuploadFileForm>({
    resolver: zodResolver(uploadFileForm),
  });

  const KEJUARAAN_FORM = [
    {
      className: "col-span-2 lg:col-span-1",
      placeholder: "Piagam Penghargaan",
      label: "Piagam Penghargaan",
      type: "file",
      register: { ...register("piagamPenghargaan") },
      error: errors.piagamPenghargaan?.message,
    },
  ];
  const onSubmit = async (userPayload: IuploadFileForm) => {
    const file = userPayload.piagamPenghargaan[0];
    const upload = await handleUploadCloudinary(file);
  };

  return (
    <Card className="mt-[20px]">
      <form onSubmit={void handleSubmit(onSubmit)}>
        <BaseForm data={KEJUARAAN_FORM} />
        <Button
          isSubmit
          isSuccess
          isMedium
          // isLoading={loading}
          className="flex w-fit items-center gap-2"
        >
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default UploadForm;
