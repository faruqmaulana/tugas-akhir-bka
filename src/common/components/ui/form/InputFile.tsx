/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useState } from "react";
import { type RegisterOptions } from "react-hook-form";
import { type FileResponse } from "~/common/libs/upload-file.lib";
import LoadingInput from "./LoadingInput";
import { useGlobalContext } from "~/common/context/GlobalContext";
import {
  ActionReducer,
  type globalFileMetaType,
} from "~/common/types/context/GlobalContextType";
import RenderPreviewFile from "../file-viewer/RenderPreviewFile";

export type InputFileType = {
  isEditForm?: boolean;
  disabled?: boolean;
  fileData?: FileResponse;
  register?: (
    name: string,
    options?: RegisterOptions
  ) => (ref: HTMLInputElement | null) => void;
  isPreview?: boolean;
  isLoading?: boolean;
  editIconAction: React.ReactNode;
};

const InputFile = (props: InputFileType) => {
  const {
    disabled,
    fileData,
    register,
    isPreview = false,
    isLoading,
    isEditForm,
    editIconAction,
  } = props;
  const { state, dispatch } = useGlobalContext();
  const { globalFileMeta } = state;

  // PREVIEW FILE STATE
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [fileType, setFileType] = useState<string | null>(null);

  // handle remove duplicate previous state
  const removeDuplicatePreviousState = (
    data: globalFileMetaType[],
    key: string
  ) => {
    if (!!data.length && data) {
      return data.filter((val) => val.key !== key);
    }

    return [];
  };

  // Function to handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files?.length > 0) {
      const currentfile = e.target.files?.[0];
      if (currentfile) {
        const reader = new FileReader();

        reader.onload = () => {
          setFileType(currentfile.type);
          setPreviewUrl(reader.result as string);

          // filter duplicate data
          const filteredData = removeDuplicatePreviousState(
            globalFileMeta as globalFileMetaType[],
            register?.name as string
          );

          dispatch({
            type: ActionReducer.UPDATE_FILE_META,
            payload: [
              ...filteredData,
              {
                key: register?.name || "",
                src: reader.result as string,
                type: currentfile.type,
                fileName: currentfile.name,
              },
            ],
          });
        };
        reader.readAsDataURL(currentfile);
      }
    } else {
      setFileType(null);
      setPreviewUrl(undefined);
    }
  };
  const currentFileState = globalFileMeta?.filter(
    (val) => val.key === register?.name
  )[0];

  const handleFileName = () => {
    if (currentFileState) return currentFileState.fileName;

    if (!fileData?.original_filename) return;

    const fileName = fileData?.original_filename || "";
    const fileType = fileData?.secure_url?.split(".")?.pop() || "";
    return `${fileName}.${fileType}`;
  };

  const handleFileSrcAndType = () => {
    const src =
      !currentFileState && fileData
        ? fileData?.secure_url
        : currentFileState?.src;

    const type =
      !currentFileState && fileData
        ? fileData?.secure_url?.split(".")?.pop() || ""
        : currentFileState?.type;

    return { src, type };
  };

  if (isPreview && isLoading) return <LoadingInput />;

  if (isPreview) {
    if (!currentFileState && !fileData) return "-";
    const { src, type } = handleFileSrcAndType();
    return (
      <div className="flex w-full flex-col">
        <p className="text-base font-semibold">{currentFileState?.fileName}</p>
        <RenderPreviewFile isPreview fileType={type} previewUrl={src} />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-1">
      <div className="flex flex-row gap-[1px]">
        <input
          {...(register || {})}
          id="img"
          disabled={disabled}
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileSelect}
          className={`relative m-0 block w-full min-w-0 flex-auto rounded-r border border-solid border-neutral-400 bg-transparent bg-clip-padding px-3 py-[0.10rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-600 dark:text-neutral-900 dark:focus:border-primary`}
        />
        {isEditForm && editIconAction}
      </div>
      {previewUrl && (
        <div className="h-auto max-h-full w-full overflow-y-auto">
          <RenderPreviewFile fileType={fileType} previewUrl={previewUrl} />
        </div>
      )}
      {handleFileName()}
    </div>
  );
};

export default InputFile;
