/* eslint-disable @typescript-eslint/restrict-template-expressions */
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
import { customToast } from "~/common/components/ui/toast/showToast";
import { JSONtoString } from "~/common/helpers/parseJSON";
import { handleUploadCloudinary } from "~/common/libs/handle-upload-cloudinary";

import { useMultiSelectUser } from "../global/useMultiSelectUser";
import {
  editPKMSchema,
  type IEditPKMSchema,
} from "~/common/schemas/module/pengajuan/pkm/create-pkm.shema";
import { type PKMByIdType } from "~/server/api/module/pengajuan/pkm/_router";
import {
  type IApprovePKMApplicationSchema,
  type IRejectPKMForm,
  approvePKMApplicationSchema,
  rejectPKMForm,
} from "~/common/schemas/module/pengajuan/pkm/approve-pkm-application.schema";
import { type FileResponse } from "~/common/libs/upload-file.lib";
import { type InputPropsType } from "~/common/components/ui/form/Input";

const usePKMAction = ({ slug }: { slug: string }) => {
  const moduleId = slug;
  const router = useRouter();
  const { refetchNotification } = useMainLayout();
  const [state, setState] = useState(INITIAL_DRAWER_STATE);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const { mutate: approve } = api.pkmModule.approvePKM.useMutation();
  const { mutate: reject } = api.pkmModule.rejectPKM.useMutation();
  const { mutate: editHaki } = api.pkmModule.editPKM.useMutation();
  const { data: dosen } = api.lecturer.getAllDosen.useQuery();

  const {
    data,
    refetch: refetchHaki,
    isLoading: isLoadingData,
  } = api.pkmModule.getPKMById.useQuery<PKMByIdType>(moduleId, {
    enabled: !!moduleId,
  });

  const {
    mahasiswa,
    mahasiswaPayload,
    handleMahasiswaLead,
    handleSelectMultipleUser,
    handleDeleteSelectedMahasiswa,
  } = useMultiSelectUser(data?.users || undefined);

  const activityLog = transformActivityLog(data?.activityLog);

  const setDefaultValue = async () => {
    if (data) {
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
  } = useForm<IEditPKMSchema>({
    resolver: zodResolver(editPKMSchema),
  });

  // APPROVE FORM
  const {
    register: registerApproveForm,
    setValue: setDefautlApproveValue,
    handleSubmit: submitApprove,
    reset: resetApproveForm,
    control: approveController,
    formState: { errors: errorsApproveForms },
  } = useForm<IApprovePKMApplicationSchema>({
    resolver: zodResolver(approvePKMApplicationSchema),
  });

  // REJECT FORM
  const {
    register: registerRejectForm,
    setValue: setDefautlRejectValue,
    handleSubmit: submitRejectHaki,
    reset: resetRejectForm,
    formState: { errors: errorsRejectForm },
  } = useForm<IRejectPKMForm>({
    resolver: zodResolver(rejectPKMForm),
  });

  useEffect(() => {
    if (data && !isLoadingData && initialLoad && !!mahasiswaPayload.length) {
      setInitialLoad(false); // run this code only once even array dependencies is updated
      setDefaultFormValue();
    }
  }, [data, isLoadingData, mahasiswaPayload]);

  // SET DEFAULT FORM VALUE
  const setDefaultFormValue = () => {
    if (data && !!mahasiswaPayload.length) {
      setDefautlRejectValue("PengajuanPKMId", data?.id);
      setDefautlApproveValue("PengajuanPKMId", data?.id);
      setDefautlApproveValue("suratKeputusanId", data?.suratKeputusanId);
      setDefaultEditValue("PengajuanPKMId", data?.id);

      // set data
      setDefaultEditValue("judul", data?.judul);
      setDefaultEditValue("users", mahasiswaPayload);
      setDefaultEditValue("dosenId", data?.dosenId);
      setDefaultEditValue("deskripsi", data?.deskripsi);
      setDefaultEditValue("tanggalKegiatan", data?.tanggalKegiatan);
      setDefaultEditValue("dokumenProposal", data?.dokumenProposal);
    }
  };

  const onSuccesAction = async () => {
    // reset form when muatation end
    resetRejectForm();
    resetApproveForm();

    // set id
    setDefautlRejectValue("PengajuanPKMId", moduleId);
    setDefautlApproveValue("PengajuanPKMId", moduleId);

    setState(INITIAL_DRAWER_STATE);
    await Promise.all([refetchNotification(), refetchHaki()]);
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
  const onEdit = async (editPayload: IEditPKMSchema) => {
    if (!data) return;
    setState((prev) => ({ ...prev, loadingEdited: true }));

    const uploadProposalPromise = handleUploadCloudinary({
      file: editPayload?.dokumenProposal?.[0] as File,
      previusFileId: (data?.dokumenProposal as PrismaJson.FileResponse)
        ?.public_id,
    });

    const [uploadProposal] = await Promise.all([uploadProposalPromise]);
    const dokumenProposal = JSONtoString(uploadProposal);

    const payload = {
      ...editPayload,
      dokumenProposal,
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
  const onReject = (rejectPayload: IRejectPKMForm) => {
    setState((prev) => ({ ...prev, loadingReject: true }));
    reject(rejectPayload, {
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
  const onApprove = async (approvePayload: IApprovePKMApplicationSchema) => {
    setState((prev) => ({ ...prev, loadingApprove: true }));

    const uploadDokumenSKPromise = handleUploadCloudinary({
      file: approvePayload?.dokumenSK?.[0] as unknown as File,
      previusFileId: (
        data?.suratKeputusan?.dokumenSK as PrismaJson.FileResponse
      )?.public_id,
    });

    const [uploadDokumenSK] = await Promise.all([uploadDokumenSKPromise]);
    const parseDokumenTambahan = JSONtoString(uploadDokumenSK);

    approve(
      { ...approvePayload, dokumenSK: parseDokumenTambahan },
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
      className: "col-span-2 lg:col-span-1",
      placeholder: "Mahasiswa",
      label: "Nama",
      type: "select",
      control: editController,
      selectData: mahasiswa,
      register: { ...registerEditForm("users") },
      error: errorsEditForms.users?.message,
      selectedData: mahasiswaPayload,
      handleSwitch: handleMahasiswaLead,
      handleDeleteSelectedData: handleDeleteSelectedMahasiswa,
      handleSelectMultipleUser: handleSelectMultipleUser,
      formFlag: "IS_MUTIPLE_SELECT_MAHASISWA_FORM",
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Dosen",
      label: "Dosen",
      type: "select",
      control: editController,
      selectData: dosen,
      register: { ...registerEditForm("dosenId") },
      error: errorsEditForms.dosenId?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Judul",
      label: "Judul",
      register: { ...registerEditForm("judul") },
      error: errorsEditForms.judul?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Tanggal Kegiatan",
      label: "Tanggal Kegiatan",
      value: new Date(), // Contoh dummy data untuk tanggal kegiatan.
      type: "date",
      control: editController,
      register: { ...registerEditForm("tanggalKegiatan") },
      error: errorsEditForms.tanggalKegiatan?.message,
    },
    {
      trigger: trigger,
      type: "textarea",
      label: "Deskripsi",
      placeholder: "Deskripsi singkat dari kegiatan PKM yang diajuakan",
      className: "col-span-2",
      register: { ...registerEditForm("deskripsi") },
      error: errorsEditForms.deskripsi?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2",
      placeholder: "Dokumen Proposal",
      type: "file",
      label: "Upload Proposal PKM",
      register: { ...registerEditForm("dokumenProposal") },
      error: errorsEditForms.dokumenProposal?.message,
      fileData: data?.dokumenProposal as FileResponse,
    },
  ];

  // EDIT FORM
  const EDIT_FORM = [
    {
      className: "col-span-2",
      type: "hidden",
      register: { ...registerEditForm("PengajuanPKMId") },
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
      register: { ...registerRejectForm("PengajuanPKMId") },
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
  const APPROVE_FORM: InputPropsType[] = [
    {
      className: "col-span-1",
      type: "hidden",
      register: { ...registerApproveForm("PengajuanPKMId") },
    },
    {
      className: "col-span-1",
      type: "hidden",
      register: { ...registerApproveForm("suratKeputusanId") },
    },
    {
      trigger: trigger,
      className: "col-span-2",
      placeholder: "Anggaran",
      label: "Anggaran",
      type: "number",
      variant: "currency",
      register: { ...registerApproveForm("totalAnggaran") },
      error: errorsApproveForms.totalAnggaran?.message,
      control: approveController,
    },
    {
      trigger: trigger,
      className: "col-span-2",
      placeholder: "No. Surat Keputusan",
      label: "No. Surat Keputusan",
      register: { ...registerApproveForm("nomorSK") },
      error: errorsApproveForms.nomorSK?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2",
      placeholder: "Tanggal Surat Keputusan",
      label: "Tanggal Surat Keputusan",
      value: new Date(), // Contoh dummy data untuk tanggal kegiatan.
      type: "date",
      control: approveController,
      register: { ...registerApproveForm("tanggalSK") },
      error: errorsApproveForms.tanggalSK?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2",
      placeholder: "Dokumen Surat Keputusan",
      label: "Dokumen Surat Keputusan",
      type: "file",
      register: { ...registerApproveForm("dokumenSK") },
      error: errorsApproveForms.dokumenSK?.message,
    },
    {
      labelFontSize: "text-[16px]",
      placeholder:
        "Contoh: Diharapkan datang ke kantor BKA pada tanggal 16 september 2023 untuk informasi lebih lanjut.",
      label: "*Tambahkan Catatan :",
      type: "textarea",
      className: "col-span-2",
      register: { ...registerApproveForm("catatan") },
      error: errorsApproveForms.catatan?.message,
    },
  ];

  return {
    router,
    data,
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

export { usePKMAction };
