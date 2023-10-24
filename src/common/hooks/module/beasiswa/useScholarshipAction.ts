/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";

import { transformActivityLog } from "~/common/transforms/transformActiviryLog";
import { type ScholarshipByIdType } from "~/server/api/module/pengajuan/beasiswa/_router";
import { useMainLayout } from "../../layout/useMainLayout";
import { INITIAL_DRAWER_STATE } from "~/common/constants/module/GLOBAL_MODULE_DRAWER_STATE";
import { useEffect, useState } from "react";
import { type FileResponse } from "~/common/libs/upload-file.lib";
import {
  type IRejectScholarshipForm,
  rejectScholarshipForm,
} from "~/common/schemas/module/pengajuan/beasiswa/approve-reject-scholarship.schema";
import { customToast } from "~/common/components/ui/toast/showToast";
import {
  type IEditScholarshipApplicationSchema,
  editscholarshipApplicationSchema,
} from "~/common/schemas/module/pengajuan/beasiswa/edit-scholarship-application.schema";
import { JSONtoString } from "~/common/helpers/parseJSON";
import { handleUploadCloudinary } from "~/common/libs/handle-upload-cloudinary";

const useScholarshipAction = ({ slug }: { slug: string }) => {
  const scholarshipId = slug;
  const router = useRouter();
  const [initialLoad, setInitialLoad] = useState(true);
  const { refetchNotification } = useMainLayout();

  const [state, setState] = useState(INITIAL_DRAWER_STATE);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const { mutate: approveScholarship } =
    api.scholarshipModule.approveScholarship.useMutation();
  const { mutate: rejectScholarship } =
    api.scholarshipModule.rejectScholarship.useMutation();
  const { mutate: editScholarship } =
    api.scholarshipModule.editScholarship.useMutation();

  const {
    data: scholarship,
    refetch: refetchScholarship,
    isLoading: isLoadingScholarship,
  } = api.scholarshipModule.getScholarshipById.useQuery<ScholarshipByIdType>(
    scholarshipId,
    {
      enabled: !!scholarshipId,
    }
  );

  const activityLog = transformActivityLog(scholarship?.ActivityLog);

  const setDefaultValue = async () => {
    if (scholarship) {
      await router.push(router.asPath);
    }
  };

  // EDIT FORM
  const {
    register: registerEditForm,
    trigger,
    handleSubmit: submitEditScholarship,
    setValue: setDefaultEditScholarshipValue,
    formState: { errors: errorsEditForms },
  } = useForm<IEditScholarshipApplicationSchema>({
    resolver: zodResolver(editscholarshipApplicationSchema),
  });

  // APPROVE FORM
  const {
    register: registerApproveForm,
    setValue: setDefautlApproveValue,
    handleSubmit: submitApproveScholarship,
    reset: resetApproveForm,
    formState: { errors: errorsApproveForm },
  } = useForm<IRejectScholarshipForm>({
    resolver: zodResolver(rejectScholarshipForm),
  });

  // REJECT FORM
  const {
    register: registerRejectForm,
    setValue: setDefautlRejectValue,
    handleSubmit: submitRejectScholarship,
    reset: resetRejectForm,
    formState: { errors: errorsRejectForm },
  } = useForm<IRejectScholarshipForm>({
    resolver: zodResolver(rejectScholarshipForm),
  });

  useEffect(() => {
    if (scholarship && !isLoadingScholarship && initialLoad) {
      setInitialLoad(false); // run this code only once even array dependencies is updated
      setDefaultFormValue();
    }
  }, [scholarship, isLoadingScholarship]);

  // SET DEFAULT FORM VALUE
  const setDefaultFormValue = () => {
    if (scholarship) {
      setDefautlRejectValue("pengajuanBeasiswaId", scholarship?.id);
      setDefautlApproveValue("pengajuanBeasiswaId", scholarship?.id);
      setDefaultEditScholarshipValue("pengajuanBeasiswaId", scholarship?.id);

      // set data
      setDefaultEditScholarshipValue("dokumen", scholarship?.dokumen);
      setDefaultEditScholarshipValue("description", scholarship?.description);
    }
  };

  const onSuccesAction = async () => {
    // reset form when muatation end
    resetRejectForm();
    resetApproveForm();

    // set id
    setDefautlRejectValue("pengajuanBeasiswaId", scholarshipId);
    setDefautlApproveValue("pengajuanBeasiswaId", scholarshipId);

    setState(INITIAL_DRAWER_STATE);
    await Promise.all([refetchNotification(), refetchScholarship()]);
    setTimeout(() => {
      setDefaultFormValue();
    }, 2000);
  };

  const handleButtonAction = (type: string) => {
    if (type === "edit") {
      setState({ ...state, isEdited: true });
    }
    if (type === "reject") {
      setState({ ...state, isReject: true });
    }
    if (type === "approve") {
      setState({ ...state, isApprove: true });
    }

    if (type === "success") {
      setState({ ...INITIAL_DRAWER_STATE, isSuccess: true });
    }

    if (type === "close") {
      setState(INITIAL_DRAWER_STATE);
    }
  };

  // SUBMIT EDIT
  const onEditScholarship = async (
    editPayload: IEditScholarshipApplicationSchema
  ) => {
    if (!scholarship) return;
    setState((prev) => ({ ...prev, loadingEdited: true }));

    const uploadDokumenPromise = handleUploadCloudinary({
      file: editPayload?.dokumen?.[0] as unknown as File,
      previusFileId: (scholarship?.dokumen as PrismaJson.FileResponse)
        ?.public_id,
    });

    const [uploadDokumen] = await Promise.all([uploadDokumenPromise]);
    const parseDokumen = JSONtoString(uploadDokumen);
    const payload = { ...editPayload, dokumen: parseDokumen };

    editScholarship(payload, {
      onSuccess: async (data) => {
        customToast("success", data?.message);
        setState({ ...state, loadingEdited: false });
        if (data?.message) {
          await onSuccesAction();
        }
      },
      onError: (error) => {
        customToast("error", error?.message);
        setState({ ...state, loadingEdited: false });
      },
    });
  };

  // SUBMIT REJECT
  const onRejectScholarship = (rejectPayload: IRejectScholarshipForm) => {
    setState((prev) => ({ ...prev, loadingReject: true }));
    rejectScholarship(rejectPayload, {
      onSuccess: async (data) => {
        customToast("success", data?.message);
        setState({ ...state, loadingReject: false });
        if (data?.message) {
          await onSuccesAction();
        }
      },
      onError: (error) => {
        customToast("error", error?.message);
        setState({ ...state, loadingReject: false });
      },
    });
  };

  // SUBMIT APPROVE
  const onApproveScholarship = (rejectPayload: IRejectScholarshipForm) => {
    setState((prev) => ({ ...prev, loadingApprove: true }));
    approveScholarship(rejectPayload, {
      onSuccess: async (data) => {
        customToast("success", data?.message);
        setState({ ...state, loadingApprove: false });
        if (data?.message) {
          await onSuccesAction();
        }
      },
      onError: (error) => {
        customToast("error", error?.message);
        setState({ ...state, loadingApprove: false });
      },
    });
  };

  // EDIT FORM
  const SCHOLARSHIP_FORM = [
    {
      trigger: trigger,
      className: "col-span-2",
      placeholder: "Dokumen Pendukung",
      type: "file",
      label: "Upload Dokumen Pengajuan Beasiswa",
      register: { ...registerEditForm("dokumen") },
      error: errorsEditForms.dokumen?.message,
      fileData: scholarship?.dokumen as FileResponse,
    },
    {
      trigger: trigger,
      type: "textarea",
      label: "Deskripsi",
      className: "col-span-2",
      register: { ...registerEditForm("description") },
      error: errorsEditForms.description?.message,
    },
  ];

  console.log(errorsEditForms);

  const EDIT_SCHOLARSHIP_FORM = [
    {
      className: "col-span-2",
      type: "hidden",
      register: { ...registerEditForm("pengajuanBeasiswaId") },
    },
    {
      labelFontSize: "text-[16px]",
      label: "*Berikan Alasan Anda :",
      placeholder: "Contoh: Dokumen tidak valid",
      type: "textarea",
      className: "col-span-2",
      register: { ...registerEditForm("catatan") },
      error: errorsEditForms.catatan?.message,
    },
  ];

  // REJECT FORM
  const REJECT_SCHOLARSHIP_FORM = [
    {
      className: "col-span-2",
      type: "hidden",
      register: { ...registerRejectForm("pengajuanBeasiswaId") },
    },
    {
      labelFontSize: "text-[16px]",
      label: "*Berikan Alasan Anda :",
      placeholder: "Contoh: Dokumen tidak valid",
      type: "textarea",
      className: "col-span-2",
      register: { ...registerRejectForm("catatan") },
      error: errorsRejectForm.catatan?.message,
    },
  ];

  // APPROVE FORM
  const APPROVE_SCHOLARSHIP_FORM = [
    {
      className: "col-span-2",
      type: "hidden",
      register: { ...registerApproveForm("pengajuanBeasiswaId") },
    },
    {
      labelFontSize: "text-[16px]",
      label: "*Berikan Alasan Anda :",
      placeholder: "Contoh: Dokumen tidak valid",
      type: "textarea",
      className: "col-span-2",
      register: { ...registerApproveForm("catatan") },
      error: errorsApproveForm.catatan?.message,
    },
  ];

  return {
    router,
    scholarship,
    SCHOLARSHIP_FORM,
    EDIT_SCHOLARSHIP_FORM,
    REJECT_SCHOLARSHIP_FORM,
    APPROVE_SCHOLARSHIP_FORM,
    activityLog,
    isLoadingScholarship,
    isDrawerOpen,
    state,
    setDefaultValue,
    setIsDrawerOpen,
    handleButtonAction,
    submitRejectScholarship,
    onRejectScholarship,
    onApproveScholarship,
    submitApproveScholarship,
    onEditScholarship,
    submitEditScholarship,
  };
};

export { useScholarshipAction };
