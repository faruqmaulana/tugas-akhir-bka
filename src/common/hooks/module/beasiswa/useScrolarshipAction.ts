import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
import {
  type IScholarshipApplicationSchema,
  scholarshipApplicationSchema,
} from "~/common/schemas/module/pengajuan/beasiswa/scholarship-application.schema";


const INITIAL_STATE = {
  isEdited: false,
  isReject: false,
  isApprove: false,
  isSuccess: false,
  loadingEdited: false,
  loadingApprove: false,
  loadingReject: false,
};


const useScholarshipAction = ({ slug }: { slug: string }) => {
  const scholarshipId = slug;
  const {
    data: scholarship,
    refetch: refetchScholarship,
    isLoading: isLoadingScholarship,
  } = api.scholarshipModule.getScholarshipById.useQuery(scholarshipId, {
    enabled: !!scholarshipId,
  });

  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<IScholarshipApplicationSchema>({
    resolver: zodResolver(scholarshipApplicationSchema),
  });

  const EDIT_SCHOLARSHIP_FORM = [
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
  return { scholarship, EDIT_SCHOLARSHIP_FORM };
};

export { useScholarshipAction };
