/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { type ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import {
  pengajuanPrestasiForm,
  type IPengajuanPrestasiForm,
} from "~/common/schemas/module/pengajuan/pengajuan-prestasi.shema";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadFile } from "~/common/libs/upload-file.lib";
import InputFile from "~/common/components/ui/form/InputFile";
import { getSignature } from "~/common/libs/get-cloudinary-signature.lib";
import PdfViewer from "~/common/components/ui/file-viewer/PdfViewer";

type ImageRes = {
  public_id: string;
  secure_url: string;
};

const UploadForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IPengajuanPrestasiForm>({
    resolver: zodResolver(pengajuanPrestasiForm),
  });

  const [avatarPreview, setAvatarPreview] = useState("");
  const [formatImage, setFormatImage] = useState<FormData | null>(null);
  const [image, setImage] = useState<ImageRes | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [progressStatus, setProgressStatus] = useState(0);
  const [file, setFile] = useState<File | null>(null);

  const onSubmit = async () => {
    try {
      const { signature, timestamp } = await getSignature();
      const formData = new FormData();
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append(
        "api_key",
        process.env.NEXT_PUBLIC_CLOUDINARY_KEY as string
      );
      formData.append("file", file as File);

      const data = await uploadFile({
        formData: formData,
        onUploadProgress(progress) {
          setProgressStatus(progress);
        },
      });

      console.log("data", data);
      if (data) {
        setFormatImage(null);
        setImage(data);
        setIsFetching(false);
        setIsSuccess(true);
      }
    } catch (err) {
      console.log(err);
      setFormatImage(null);
      setImage(null);
      setIsFetching(false);
      setIsSuccess(false);
    }
  };

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target?.files;
    const file = files?.[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
    setFile(file);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/pdf/*"
        id="avatar"
        onChange={onChangeFile}
      />
      <InputFile />
      <PdfViewer
        className="mt-2"
        url="https://res.cloudinary.com/dbbbfwlwt/image/upload/v1694632068/doyqosbwwuxcfve1naaj.pdf"
      />
      <button onClick={() => void onSubmit()}>Upload</button>
    </div>
  );
};

export default UploadForm;
