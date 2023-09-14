/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useState } from "react";
import PdfViewer from "../file-viewer/PdfViewer";
import Image from "next/image";
import { type RegisterOptions } from "react-hook-form";

export type InputFileType = {
  register?: (
    name: string,
    options?: RegisterOptions
  ) => (ref: HTMLInputElement | null) => void;
};

const InputFile = (props: InputFileType) => {
  const { register } = props;
  // PREVIEW FILE STATE
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [fileType, setFileType] = useState<string | null>(null);

  // Function to handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentfile = e.target.files?.[0];
    if (currentfile) {
      const reader = new FileReader();

      reader.onload = () => {
        setSelectedFile(currentfile);
        setFileType(currentfile.type);
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(currentfile);
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

  return (
    <>
      <div className="flex flex-row gap-2">
        <input
          {...(register || {})}
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileSelect}
          className={`relative m-0 block w-full min-w-0 flex-auto rounded-r border border-solid border-neutral-400 bg-transparent bg-clip-padding px-3 py-[0.10rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-600 dark:text-neutral-900 dark:focus:border-primary`}
        />
      </div>
      {previewUrl && (
        <div className="max-h-[200px] overflow-auto">{renderPreview()}</div>
      )}
      {selectedFile && <p>Selected File: {selectedFile.name}</p>}
    </>
  );
};

export default InputFile;
