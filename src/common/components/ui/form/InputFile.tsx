/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useState } from "react";
import PdfViewer from "../file-viewer/PdfViewer";
import Image from "next/image";
import { type RegisterOptions } from "react-hook-form";
import { type FileResponse } from "~/common/libs/upload-file.lib";

export type InputFileType = {
  isEditForm?: boolean;
  disabled?: boolean;
  fileData?: FileResponse;
  register?: (
    name: string,
    options?: RegisterOptions
  ) => (ref: HTMLInputElement | null) => void;
};

const InputFile = (props: InputFileType) => {
  const { disabled, isEditForm, fileData, register } = props;

  // PREVIEW FILE STATE
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [fileType, setFileType] = useState<string | null>(null);

  // Function to handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files?.length > 0) {
      const currentfile = e.target.files?.[0];
      if (currentfile) {
        const reader = new FileReader();

        reader.onload = () => {
          setFileType(currentfile.type);
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(currentfile);
      }
    } else {
      setFileType(null);
      setPreviewUrl(undefined);
    }
  };

  const renderPreview = () => {
    if (fileType && fileType.startsWith("image/")) {
      return (
        <Image
          width={0}
          height={0}
          sizes="100vw"
          src={previewUrl as string}
          alt="File Preview"
          className="mt-2 h-auto w-full"
        />
      );
    } else if (fileType === "application/pdf") {
      return <PdfViewer className="mt-2" url={previewUrl as string} />;
    }
    return null; // Handle other file types as needed
  };

  const handleFileName = () => {
    if(!fileData?.original_filename) return
    const fileName = fileData?.original_filename || "";
    const fileType = fileData?.secure_url?.split(".")?.pop() || "";
    return `${fileName}.${fileType}`;
  };

  return (
    <div className="flex w-full flex-col gap-1">
      <input
        {...(register || {})}
        id="img"
        disabled={disabled}
        type="file"
        accept="image/*,.pdf"
        onChange={handleFileSelect}
        className={`relative m-0 block w-full min-w-0 flex-auto rounded-r border border-solid border-neutral-400 bg-transparent bg-clip-padding px-3 py-[0.10rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-600 dark:text-neutral-900 dark:focus:border-primary`}
      />
      {previewUrl && (
        <div className="h-auto w-full overflow-y-auto md:max-h-[200px]">
          {renderPreview()}
        </div>
      )}
      {handleFileName()}
    </div>
  );
};

export default InputFile;
