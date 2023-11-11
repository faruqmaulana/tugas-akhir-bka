/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";

import { transformActivityLog } from "~/common/transforms/transformActiviryLog";
import { useMainLayout } from "../../layout/useMainLayout";
import { INITIAL_DRAWER_STATE } from "~/common/constants/module/GLOBAL_MODULE_DRAWER_STATE";
import { useEffect, useState } from "react";
import { type FileResponse } from "~/common/libs/upload-file.lib";
import { customToast } from "~/common/components/ui/toast/showToast";
import { JSONtoString } from "~/common/helpers/parseJSON";
import { handleUploadCloudinary } from "~/common/libs/handle-upload-cloudinary";
import {
  type IApproveHakiApplicationSchema,
  type IRejectHakiForm,
  approveHakiApplicationSchema,
  rejectHakiForm,
} from "~/common/schemas/module/pengajuan/haki/approve-haki-application.schema";
import { type HakiByIdType } from "~/server/api/module/pengajuan/haki/_router";
import {
  type IEditHakiForm,
  editHakiForm,
} from "~/common/schemas/module/pengajuan/haki/edit-haki-application.schema";
import { useMultiSelectUser } from "../global/useMultiSelectUser";
import { useGlobalContext } from "~/common/context/GlobalContext";
import { ActionReducer } from "~/common/types/context/GlobalContextType";

const useHakiAction = ({ slug }: { slug: string }) => {
  const hakiId = slug;
  const router = useRouter();
  const { dispatch } = useGlobalContext();
  const [initialLoad, setInitialLoad] = useState(true);
  const { refetchNotification } = useMainLayout();

  const [state, setState] = useState(INITIAL_DRAWER_STATE);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const { mutate: approveHaki } = api.hakiModule.approveHaki.useMutation();
  const { mutate: rejectHaki } = api.hakiModule.rejectHaki.useMutation();
  const { mutate: editHaki } = api.hakiModule.editHaki.useMutation();

  const {
    data: haki,
    refetch: refetchHaki,
    isLoading: isLoadingData,
  } = api.hakiModule.getHakiById.useQuery<HakiByIdType>(hakiId, {
    enabled: !!hakiId,
  });

  const mergedUser: any = [];
  if (haki?.PengajuanOnUsers) {
    mergedUser.push(...(haki?.PengajuanOnUsers || {}));
  }
  if (haki?.dosen) {
    mergedUser.push(...((haki?.dosen as any[]) || {}));
  }

  const {
    mahasiswa,
    mahasiswaPayload,
    handleDeleteSelectedMahasiswa,
    handleSelectMultipleUser,
  } = useMultiSelectUser(mergedUser || undefined);

  const activityLog = transformActivityLog(haki?.ActivityLog);

  const setDefaultValue = async () => {
    if (haki) {
      await router.push(router.asPath);
    }
  };

  // EDIT FORM
  const {
    register: registerEditForm,
    trigger,
    setValue: setDefaultEditValue,
    handleSubmit: submitEdit,
    control: editController,
    formState: { errors: errorsEditForms },
  } = useForm<IEditHakiForm>({
    resolver: zodResolver(editHakiForm),
  });

  // APPROVE FORM
  const {
    register: registerApproveForm,
    setValue: setDefautlApproveValue,
    handleSubmit: submitApprove,
    reset: resetApproveForm,
    control: approveController,
    formState: { errors: errorsHakiForm },
  } = useForm<IApproveHakiApplicationSchema>({
    resolver: zodResolver(approveHakiApplicationSchema),
  });

  // REJECT FORM
  const {
    register: registerRejectForm,
    setValue: setDefautlRejectValue,
    handleSubmit: submitRejectHaki,
    reset: resetRejectForm,
    formState: { errors: errorsRejectForm },
  } = useForm<IRejectHakiForm>({
    resolver: zodResolver(rejectHakiForm),
  });

  useEffect(() => {
    if (haki && !isLoadingData && initialLoad && !!mahasiswaPayload.length) {
      setInitialLoad(false); // run this code only once even array dependencies is updated
      setDefaultFormValue();

      // SET PENGAJU DOKUMEN
      dispatch({
        type: ActionReducer.UPDATE_PENGAJU_DOKUMEN,
        payload: haki.createdById,
      });
    }
  }, [haki, isLoadingData, mahasiswaPayload]);

  // SET DEFAULT FORM VALUE
  const setDefaultFormValue = () => {
    if (haki && !!mahasiswaPayload.length) {
      setDefautlRejectValue("patenAndHakiTableId", haki?.id);
      setDefautlApproveValue("patenAndHakiTableId", haki?.id);
      setDefaultEditValue("patenAndHakiTableId", haki?.id);

      // set data
      setDefaultEditValue("dokumenPendukung", haki?.dokumenPendukung);
      setDefaultEditValue("keterangan", haki?.keterangan);
      setDefaultEditValue("judul", haki?.judul);
      setDefaultEditValue("users", mahasiswaPayload);
    }
  };

  const onSuccesAction = async () => {
    // reset form when muatation end
    resetRejectForm();
    resetApproveForm();

    // set id
    setDefautlRejectValue("patenAndHakiTableId", hakiId);
    setDefautlApproveValue("patenAndHakiTableId", hakiId);

    setState(INITIAL_DRAWER_STATE);
    await Promise.all([refetchNotification(), refetchHaki()]);
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
  const onEdit = async (editPayload: IEditHakiForm) => {
    if (!haki) return;
    setState((prev) => ({ ...prev, loadingEdited: true }));

    const uploadDokumenPendukungPromise = handleUploadCloudinary({
      file: editPayload?.dokumenPendukung?.[0] as unknown as File,
      previusFileId: (haki?.dokumenPendukung as PrismaJson.FileResponse)
        ?.public_id,
    });

    const [uploadDokumen] = await Promise.all([uploadDokumenPendukungPromise]);
    const parseDokumenPendukung = JSONtoString(uploadDokumen);

    const payload = {
      ...editPayload,
      dokumenPendukung: parseDokumenPendukung,
      users: mahasiswaPayload,
    };

    editHaki(payload, {
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
  const onReject = (rejectPayload: IRejectHakiForm) => {
    setState((prev) => ({ ...prev, loadingReject: true }));
    rejectHaki(rejectPayload, {
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
  const onApprove = async (rejectPayload: IApproveHakiApplicationSchema) => {
    setState((prev) => ({ ...prev, loadingApprove: true }));

    const uploadDokumenTambahanPromise = handleUploadCloudinary({
      file: rejectPayload?.dokumenTambahan?.[0] as unknown as File,
      previusFileId: (haki?.dokumenPendukung as PrismaJson.FileResponse)
        ?.public_id,
    });

    const [uploadDokumenTambahan] = await Promise.all([
      uploadDokumenTambahanPromise,
    ]);
    const parseDokumenTambahan = JSONtoString(uploadDokumenTambahan);

    approveHaki(
      { ...rejectPayload, dokumenTambahan: parseDokumenTambahan },
      {
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
      }
    );
  };

  const DISPLAYED_FORM = [
    {
      trigger: trigger,
      className: "col-span-2",
      placeholder: "Judul",
      label: "Judul",
      register: { ...registerEditForm("judul") },
      error: errorsEditForms.judul?.message,
    },
    {
      trigger: trigger,
      type: "textarea",
      label: "Deskripsi",
      placeholder: "Contoh: karya musik, buku, atau karya seni visual",
      className: "col-span-2",
      register: { ...registerEditForm("keterangan") },
      error: errorsEditForms.keterangan?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2",
      placeholder: "Dokumen Pendukung",
      type: "file",
      label: "Upload Dokumen Pendukung",
      register: { ...registerEditForm("dokumenPendukung") },
      error: errorsEditForms.dokumenPendukung?.message,
      fileData: haki?.dokumenPendukung as FileResponse,
    },
    {
      trigger: trigger,
      className: "col-span-2",
      placeholder: "Pemegang Paten",
      label: "Pemegang Paten",
      type: "select",
      control: editController,
      selectData: mahasiswa,
      register: { ...registerEditForm("users") },
      error: errorsEditForms.users?.message,
      selectedData: mahasiswaPayload,
      handleDeleteSelectedData: handleDeleteSelectedMahasiswa,
      handleSelectMultipleUser: handleSelectMultipleUser,
      formFlag: "IS_MUTIPLE_SELECT_MAHASISWA_FORM",
    },
  ];

  // EDIT FORM
  const EDIT_FORM = [
    {
      className: "col-span-2",
      type: "hidden",
      register: { ...registerEditForm("patenAndHakiTableId") },
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
  const REJECT_FORM = [
    {
      className: "col-span-2",
      type: "hidden",
      register: { ...registerRejectForm("patenAndHakiTableId") },
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
  const APPROVE_FORM = [
    {
      className: "col-span-2",
      type: "hidden",
      register: { ...registerApproveForm("patenAndHakiTableId") },
    },
    {
      trigger: trigger,
      className: "col-span-2",
      placeholder: "Nomor Paten",
      label: "Nomor Paten",
      register: { ...registerApproveForm("nomorPaten") },
      error: errorsHakiForm.nomorPaten?.message,
    },

    {
      trigger: trigger,
      className: "col-span-2",
      placeholder: "Tanggal Kadaluarsa Haki",
      label: "Tanggal Kadaluarsa Haki",
      value: new Date(), // Contoh dummy data untuk tanggal kegiatan.
      type: "date",
      control: approveController,
      register: { ...registerApproveForm("expiredDate") },
      error: errorsHakiForm.expiredDate?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2",
      placeholder: "Dokumen Tambahan",
      label: "Dokumen Tambahan",
      type: "file",
      register: { ...registerApproveForm("dokumenTambahan") },
      error: errorsHakiForm.dokumenTambahan?.message,
    },
    {
      labelFontSize: "text-[16px]",
      label: "*Berikan Alasan Anda :",
      placeholder: "Contoh: Dokumen tidak valid",
      type: "textarea",
      className: "col-span-2",
      register: { ...registerApproveForm("catatan") },
      error: errorsHakiForm.catatan?.message,
    },
  ];

  return {
    router,
    haki,
    DISPLAYED_FORM,
    EDIT_FORM,
    REJECT_FORM,
    APPROVE_FORM,
    activityLog,
    isLoadingData,
    isDrawerOpen,
    state,
    setDefaultValue,
    setIsDrawerOpen,
    handleButtonAction,
    submitRejectHaki,
    submitApprove,
    submitEdit,
    onReject,
    onApprove,
    onEdit,
  };
};

export { useHakiAction };
