/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ContentBlock,
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { customToast } from "~/common/components/ui/toast/showToast";
import { JSONtoString } from "~/common/helpers/parseJSON";
import { handleUploadCloudinary } from "~/common/libs/handle-upload-cloudinary";
import { type FileResponse } from "~/common/libs/upload-file.lib";
import {
  scholarshipSchema,
  type IScholarshipSchema,
} from "~/common/schemas/module/master-data/scholarship.schema";
import { type MasterDataBeasiswaType } from "~/server/api/module/master-data/scholarship/_router";
import { api } from "~/utils/api";

const useEditBeasiswa = () => {
  const router = useRouter();

  const { data: scholarship, isLoading } =
    api.scholarship.getScholarship.useQuery<MasterDataBeasiswaType>();
  const { mutate: editScholarshipMasterDataHandler } =
    api.scholarship.editScholarshipMasterData.useMutation();
  const [plainText, setPlainText] = useState(scholarship?.syarat || "");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [loading, setLoading] = useState(false);

  const onEditorStateChange = (editorState: EditorState) => {
    setPlainText(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    setValue(
      "syarat",
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
    return setEditorState(editorState);
  };

  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<IScholarshipSchema>({
    resolver: zodResolver(scholarshipSchema),
  });

  const onSubmit = async (userPayload: IScholarshipSchema) => {
    setLoading(true);

    const { templateFormulir } = userPayload;

    const uploadTemplateFormulirPromise = handleUploadCloudinary({
      file: templateFormulir?.[0] as File,
      previusFileId: (scholarship?.templateFormulir as PrismaJson.FileResponse)
        ?.public_id,
    });

    const [uploadTemplateFormulir] = await Promise.all([
      uploadTemplateFormulirPromise,
    ]);

    const transformDocument = JSONtoString(uploadTemplateFormulir);
    editScholarshipMasterDataHandler(
      { ...userPayload, templateFormulir: transformDocument },
      {
        onSuccess: (data) => {
          customToast("success", data?.message);
          setLoading(false);
          void router.push("/master-data/beasiswa/");
        },
        onError: (error) => {
          customToast("error", error?.message);
          setLoading(false);
        },
      }
    );
  };

  useEffect(() => {
    if (scholarship) {
      setValue("id", scholarship?.id);
      setValue("syarat", scholarship?.syarat);
      setValue("templateFormulir", scholarship?.templateFormulir);
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(scholarship.syarat) as unknown as ContentBlock[]
          )
        )
      );
    }
  }, [scholarship, setValue]);

  const SCHOLARSHIP_FORM = [
    {
      type: "hidden",
      register: { ...register("id") },
      error: errors.id?.message,
    },
    {
      type: "hidden",
      register: { ...register("syarat") },
      value: plainText,
      error: errors.syarat?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2 !gap-0",
      placeholder: "Dokumen Pendukung",
      type: "file",
      register: { ...register("templateFormulir") },
      error: errors.templateFormulir?.message,
      fileData: scholarship?.templateFormulir as FileResponse,
    },
  ];

  return {
    editorState,
    setEditorState,
    onEditorStateChange,
    handleSubmit,
    router,
    onSubmit,
    SCHOLARSHIP_FORM,
    loading,
    scholarship,
    isLoading,
  };
};

export { useEditBeasiswa };
