import React from "react";
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
  if (!fileType || !previewUrl) return null;

  if (fileType && fileType.startsWith("image/")) {
    return (
      <div className={!isPreview ? "max-h-[400px] overflow-auto" : ""}>
        <Image
          width={0}
          height={0}
          sizes="100vw"
          src={previewUrl}
          alt="File Preview"
          className="mt-2 h-auto w-full"
        />
      </div>
    );
  }

  if (fileType === "application/pdf") {
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
