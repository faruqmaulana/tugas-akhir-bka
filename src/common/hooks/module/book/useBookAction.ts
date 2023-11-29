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

import { type InputPropsType } from "~/common/components/ui/form/Input";
import {
  editBookSchema,
  type IEditBookForm,
} from "~/common/schemas/module/pengajuan/book/edit-book.schema";
import { type BookByIdType } from "~/server/api/module/pengajuan/book/_router";
import {
  type IApproveBookForm,
  approveBookSchema,
} from "~/common/schemas/module/pengajuan/book/approve-book.schema";
import {
  type IRejectBookForm,
  rejectBookSchema,
} from "~/common/schemas/module/pengajuan/book/reject-book.schema";
import { type FileResponse } from "~/common/libs/upload-file.lib";

const useBookAction = ({ slug }: { slug: string }) => {
  const moduleId = slug;
  const router = useRouter();
  const { refetchNotification } = useMainLayout();
  const [state, setState] = useState(INITIAL_DRAWER_STATE);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const { mutate: approve } = api.bookModule.approveBook.useMutation();
  const { mutate: reject } = api.bookModule.rejectBook.useMutation();
  const { mutate: editHaki } = api.bookModule.editBook.useMutation();

  const {
    data,
    refetch: refetchHaki,
    isLoading: isLoadingData,
  } = api.bookModule.getBookById.useQuery<BookByIdType>(moduleId, {
    enabled: !!moduleId,
  });

  const activityLog = transformActivityLog(data?.ActivityLog);

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
    formState: { errors: errorsEditForms },
  } = useForm<IEditBookForm>({
    resolver: zodResolver(editBookSchema),
  });

  // APPROVE FORM
  const {
    register: registerApproveForm,
    setValue: setDefautlApproveValue,
    handleSubmit: submitApprove,
    reset: resetApproveForm,
    control: approveController,
    formState: { errors: errorsApproveForms },
  } = useForm<IApproveBookForm>({
    resolver: zodResolver(approveBookSchema),
  });

  // REJECT FORM
  const {
    register: registerRejectForm,
    setValue: setDefautlRejectValue,
    handleSubmit: submitRejectHaki,
    reset: resetRejectForm,
    formState: { errors: errorsRejectForm },
  } = useForm<IRejectBookForm>({
    resolver: zodResolver(rejectBookSchema),
  });

  useEffect(() => {
    if (data && !isLoadingData && initialLoad) {
      setInitialLoad(false); // run this code only once even array dependencies is updated
      setDefaultFormValue();
    }
  }, [data, isLoadingData]);

  // SET DEFAULT FORM VALUE
  const setDefaultFormValue = () => {
    if (data) {
      setDefautlRejectValue("id", data?.id);
      setDefautlApproveValue("id", data?.id);
      setDefaultEditValue("id", data?.id);

      // set data
      setDefaultEditValue("judulBuku", data?.judulBuku);
      setDefaultEditValue("pengarang", data?.pengarang);
      setDefaultEditValue("penulis", data?.penulis);
      setDefaultEditValue("penerbit", data?.penerbit);
      setDefaultEditValue("jumlahEksemplar", data?.jumlahEksemplar);
      setDefaultEditValue("dokumenPendukung", data?.dokumenPendukung);
    }
  };

  const onSuccesAction = async () => {
    // reset form when muatation end
    resetRejectForm();
    resetApproveForm();

    // set id
    setDefautlRejectValue("id", moduleId);
    setDefautlApproveValue("id", moduleId);

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
  const onEdit = async (editPayload: IEditBookForm) => {
    if (!data) return;
    setState((prev) => ({ ...prev, loadingEdited: true }));

    const uploadProposalPromise = handleUploadCloudinary({
      file: editPayload?.dokumenPendukung?.[0] as File,
      previusFileId: (data?.dokumenPendukung as PrismaJson.FileResponse)
        ?.public_id,
    });

    const [uploadProposal] = await Promise.all([uploadProposalPromise]);
    const dokumenPendukung = JSONtoString(uploadProposal);

    const payload = {
      ...editPayload,
      dokumenPendukung,
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
  const onReject = (rejectPayload: IRejectBookForm) => {
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
  const onApprove = async (rejectPayload: IApproveBookForm) => {
    setState((prev) => ({ ...prev, loadingApprove: true }));

    const uploadDokumenSKPromise = handleUploadCloudinary({
      file: rejectPayload?.dokumenSK?.[0] as unknown as File,
      previusFileId: (data?.suratKeputusan?.dokumenSK as PrismaJson.FileResponse)?.public_id,
    });

    const [uploadDokumenSK] = await Promise.all([uploadDokumenSKPromise]);
    const parseDokumenTambahan = JSONtoString(uploadDokumenSK);

    approve(
      { ...rejectPayload, dokumenSK: parseDokumenTambahan },
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
      placeholder: "Judul",
      label: "Judul Buku",
      register: { ...registerEditForm("judulBuku") },
      error: errorsEditForms.judulBuku?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Pengarang",
      label: "Pengarang",
      register: { ...registerEditForm("pengarang") },
      error: errorsEditForms.pengarang?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Penulis",
      label: "Penulis",
      register: { ...registerEditForm("penulis") },
      error: errorsEditForms.penulis?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Penerbit",
      label: "Penerbit",
      register: { ...registerEditForm("penerbit") },
      error: errorsEditForms.penerbit?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Jumlah Eksemplar",
      label: "Jumlah Eksemplar",
      type: "number",
      register: { ...registerEditForm("jumlahEksemplar") },
      error: errorsEditForms.jumlahEksemplar?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Dokumen Pendukung",
      type: "file",
      label: "Upload Dokumen Pendukung",
      register: { ...registerEditForm("dokumenPendukung") },
      error: errorsEditForms.dokumenPendukung?.message,
      fileData: data?.dokumenPendukung as FileResponse,
    },
  ];

  // EDIT FORM
  const EDIT_FORM = [
    {
      className: "col-span-2",
      type: "hidden",
      register: { ...registerEditForm("id") },
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
      register: { ...registerRejectForm("id") },
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
      className: "col-span-2",
      type: "hidden",
      register: { ...registerApproveForm("id") },
    },
    {
      className: "col-span-2",
      type: "hidden",
      register: { ...registerApproveForm("suratKeputusanId") },
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Nomor ISBN",
      label: "Nomor ISBN",
      register: { ...registerApproveForm("nomorISBN") },
      error: errorsApproveForms.nomorISBN?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Tahun Terbit",
      label: "Tahun Terbit",
      value: new Date(), // Contoh dummy data untuk tanggal kegiatan.
      type: "date",
      control: approveController,
      register: { ...registerApproveForm("tahunTerbit") },
      error: errorsApproveForms.tahunTerbit?.message,
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
      className: "col-span-2",
      type: "textarea",
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

export { useBookAction };
