import React, { useState } from "react";
import Image from "next/image";
import PdfViewer from "./PdfViewer";

const RenderPreviewFile = ({
  fileType,
  previewUrl,
  isPreview = false,
}: {
  fileType?: string | null;
  previewUrl?: string;
  isPreview?: boolean;
}) => {
  const [errorImage, setErrorImage] = useState<boolean>(false);
  if (!fileType || !previewUrl) return null;

  if (
    (fileType && fileType.startsWith("image/")) ||
    fileType === "jpg" ||
    fileType === "png"
  ) {
    return (
      <div
        className={
          !isPreview
            ? "max-h-[400px] overflow-auto"
            : "max-h-[400px] overflow-auto"
        }
      >
        <Image
          width={0}
          height={0}
          sizes="100vw"
          src={previewUrl}
          alt="File Preview"
          className="mt-2 h-auto w-full"
          onError={() => setErrorImage(true)}
        />
        {errorImage && (
          <p className="mt-1 w-fit rounded-md border border-red-500 bg-red-50 px-2 text-sm text-red-600">
            Terjadi kesalahan sistem, harap upload ulang file.
          </p>
        )}
      </div>
    );
  }

  if (fileType.includes("pdf")) {
    return (
      <PdfViewer
        className={!isPreview ? "mt-2 max-h-[400px] overflow-auto" : "mt-2"}
        url={previewUrl}
      />
    );
  }

  return null; // Handle other file types as needed
};

export default RenderPreviewFile;
