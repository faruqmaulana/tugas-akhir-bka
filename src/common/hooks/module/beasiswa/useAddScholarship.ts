/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { customToast } from "~/common/components/ui/toast/showToast";
import { JSONtoString } from "~/common/helpers/parseJSON";
import { handleUploadCloudinary } from "~/common/libs/handle-upload-cloudinary";
import {
  type IScholarshipApplicationSchema,
  scholarshipApplicationSchema,
} from "~/common/schemas/module/pengajuan/beasiswa/scholarship-application.schema";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

const useAddScholarship = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate: addScholarship } =
    api.scholarshipModule.addScholarshipApplication.useMutation();

  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<IScholarshipApplicationSchema>({
    resolver: zodResolver(scholarshipApplicationSchema),
  });

  const onSubmit = useCallback(
    async (userPayload: IScholarshipApplicationSchema) => {
      setLoading(true);
      const uploadTemplateFormulirPromise = handleUploadCloudinary({
        file: userPayload?.dokumen?.[0] as File,
      });

      const [uploadTemplateFormulir] = await Promise.all([
        uploadTemplateFormulirPromise,
      ]);

      const dokumen = JSONtoString(uploadTemplateFormulir);

      addScholarship(
        { ...userPayload, dokumen },
        {
          onSuccess: (data) => {
            customToast("success", data?.message);
            setLoading(false);
            void router.push("/module/beasiswa");
          },
          onError: (error) => {
            customToast("error", error?.message);
            setLoading(false);
          },
        }
      );
    },
    []
  );

  const ADD_SCHOLARSHIP_FORM = [
    {
      trigger: trigger,
      className: "col-span-2",
      placeholder: "Dokumen Pendukung",
      type: "file",
      label: "Upload Dokumen Pengajuan Beasiswa",
      register: { ...register("dokumen") },
      error: errors.dokumen?.message,
    },
    {
      trigger: trigger,
      type: "textarea",
      label: "Deskripsi",
      className: "col-span-2",
      register: { ...register("description") },
      error: errors.description?.message,
    },
  ];

  return { ADD_SCHOLARSHIP_FORM, handleSubmit, onSubmit, loading };
};

export { useAddScholarship };
