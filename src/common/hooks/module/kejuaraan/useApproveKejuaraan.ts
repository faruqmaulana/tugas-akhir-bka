/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type IApprovePrestasiForm,
  approvePrestasiForm,
  type IRejectPrestasiForm,
  rejectPrestasiForm,
} from "~/common/schemas/module/pengajuan/approve-prestasi.schema";
import { api } from "~/utils/api";
import { customToast } from "~/common/components/ui/toast/showToast";
import { useMainLayout } from "../../layout/useMainLayout";
import { transformActivityLog } from "~/common/transforms/transformActiviryLog";
import { STATUS } from "~/common/enums/STATUS";
import { useCurrentUser } from "../profile";
import { useKejuaraan } from "./useKejuaraan";
import { type IPengajuanPrestasiForm } from "~/common/schemas/module/pengajuan/pengajuan-prestasi.shema";
import { replaceForms } from "~/common/helpers/replaceForms";
import { handleUploadCloudinary } from "~/common/libs/handle-upload-cloudinary";
import { handleDocumentMetaToString } from "~/common/libs/handle-document-data";

const INITIAL_STATE = {
  isEdited: false,
  isReject: false,
  isApprove: false,
  isSuccess: false,
  loadingEdited: false,
  loadingApprove: false,
  loadingReject: false,
};

const useApproveKejuaraan = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const { isAdmin } = useCurrentUser();
  const { refetchNotification } = useMainLayout();
  const [state, setState] = useState<typeof INITIAL_STATE>(INITIAL_STATE);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const prestasiDataTableId = slug;
  const { mutate: approvePengajuanPrestasi } =
    api.prestasiLomba.approvePengajuanPrestasi.useMutation();
  const { mutate: rejectPengajuanPrestasi } =
    api.prestasiLomba.rejectPengajuanPrestasi.useMutation();

  const { mutate: editPengajuanPrestasi } =
    api.prestasiLomba.editPengajuanPrestasi.useMutation();

  const {
    data: prestasi,
    refetch: refetchPrestasi,
    isLoading: isLoadingPrestasiData,
  } = api.prestasiLomba.getKejuaraanById.useQuery(prestasiDataTableId, {
    enabled: !!prestasiDataTableId,
  });

  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  
  const handleOpenPreview = () => setIsPreviewOpen(true);
  const handleClosePreview = () => setIsPreviewOpen(false);

  const isAdminAndApproved = prestasi?.status === STATUS.APPROVE && isAdmin;

  const {
    handleSubmit,
    KEJUARAAN_FORM,
    register: registerKejuaraanForm,
    setValue: setDefaultKejuaraanValue,
    errors: errorsKejuaraanForm,
  } = useKejuaraan(prestasi?.users);

  const activityLog = transformActivityLog(prestasi?.activityLog);

  const setDefaultValue = async () => {
    if (prestasi) {
      await router.push(router.asPath);
    }
  };

  useEffect(() => {
    if (!isLoadingPrestasiData && prestasi) {
      setDefaultKejuaraanValue("kegiatan", prestasi.kegiatan);
      setDefaultKejuaraanValue("tanggalKegiatan", prestasi.tanggalKegiatan);
      setDefaultKejuaraanValue("penyelenggara", prestasi.penyelenggara || "");
      setDefaultKejuaraanValue("tanggalKegiatan", prestasi.tanggalKegiatan);
      setDefaultKejuaraanValue("dosenId", prestasi.dosenId);
      setDefaultKejuaraanValue("orkemId", prestasi?.orkemId || undefined);
      setDefaultKejuaraanValue("tingkatPrestasiId", prestasi.tingkatPrestasiId);
      setDefaultKejuaraanValue("status", prestasi.status);
      setDefaultKejuaraanValue(
        "tingkatKejuaraanId",
        prestasi.tingkatKejuaraanId
      );
      setDefaultKejuaraanValue(
        "piagamPenghargaan",
        prestasi?.lampiran?.piagamPenghargaan
      );
      setDefaultKejuaraanValue(
        "fotoPenyerahanPiala",
        prestasi?.lampiran?.fotoPenyerahanPiala
      );
      setDefaultKejuaraanValue(
        "undanganKejuaraan",
        prestasi?.lampiran?.undanganKejuaraan
      );
      setDefaultKejuaraanValue(
        "dokumenPendukung",
        prestasi?.lampiran?.dokumenPendukung
      );
    }
  }, [isLoadingPrestasiData, setDefaultKejuaraanValue]);

  const renderActionButton = () => {
    switch (true) {
      case isAdmin &&
        (prestasi?.status === STATUS.PROCESSED ||
          prestasi?.status === STATUS.EDITED ||
          prestasi?.status === STATUS.REPROCESS):
        return true;
      default:
        return false;
    }
  };

  const {
    register: registerRejectForm,
    setValue: setDefautlRejectValue,
    handleSubmit: submitRejectKejuaraan,
    reset: resetRejectForm,
    formState: { errors: errorsRejectForm },
  } = useForm<IRejectPrestasiForm>({
    resolver: zodResolver(rejectPrestasiForm),
  });

  const {
    register,
    setValue,
    trigger,
    control,
    reset: resetApproveForm,
    handleSubmit: submitApproveKejuaraan,
    formState: { errors },
  } = useForm<IApprovePrestasiForm>({
    resolver: zodResolver(approvePrestasiForm),
  });

  useEffect(() => {
    setValue("prestasiDataTableId", prestasiDataTableId);
    setDefautlRejectValue("prestasiDataTableId", prestasiDataTableId);
    setDefaultKejuaraanValue("prestasiDataTableId", prestasiDataTableId);
  }, [
    prestasiDataTableId,
    setValue,
    setDefautlRejectValue,
    setDefaultKejuaraanValue,
  ]);

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
      setState({ ...INITIAL_STATE, isSuccess: true });
    }

    if (type === "close") {
      setState(INITIAL_STATE);
    }
  };

  const onSuccesAction = async () => {
    resetApproveForm();
    resetRejectForm();
    setValue("prestasiDataTableId", prestasiDataTableId);
    setDefautlRejectValue("prestasiDataTableId", prestasiDataTableId);
    setDefaultKejuaraanValue("prestasiDataTableId", prestasiDataTableId);
    setDefaultKejuaraanValue("catatan", "");
    setState(INITIAL_STATE);
    await Promise.all([refetchNotification(), refetchPrestasi()]);
  };

  const onApproveKejuaraan = (approvePayload: IApprovePrestasiForm) => {
    setState((prev) => ({ ...prev, loadingApprove: true }));
    approvePengajuanPrestasi(approvePayload, {
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

  const onRejectKejuaraan = (rejectPayload: IRejectPrestasiForm) => {
    setState((prev) => ({ ...prev, loadingReject: true }));
    rejectPengajuanPrestasi(rejectPayload, {
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

  const onSubmit = async (userPayload: IPengajuanPrestasiForm) => {
    setState((prev) => ({ ...prev, loadingEdited: true }));
    if (!prestasi) return;
    const {
      dokumenPendukung,
      fotoPenyerahanPiala,
      piagamPenghargaan,
      undanganKejuaraan,
    } = userPayload;

    const uploadDokumenPendukungPromise = handleUploadCloudinary({
      file: dokumenPendukung?.[0] as File,
      previusFileId: (
        prestasi?.lampiran.dokumenPendukung as PrismaJson.FileResponse
      )?.public_id,
    });

    const uploadPenyerahanPialaPromise = handleUploadCloudinary({
      file: fotoPenyerahanPiala?.[0] as File,
      previusFileId: (
        prestasi?.lampiran.fotoPenyerahanPiala as PrismaJson.FileResponse
      )?.public_id,
    });

    const uploadPiagamPenghargaanPromise = handleUploadCloudinary({
      file: piagamPenghargaan?.[0] as File,
      previusFileId: (
        prestasi?.lampiran.piagamPenghargaan as PrismaJson.FileResponse
      )?.public_id,
    });

    const uploadUndanganKejuaraanPromise = handleUploadCloudinary({
      file: undanganKejuaraan?.[0] as File,
      previusFileId: (
        prestasi?.lampiran.undanganKejuaraan as PrismaJson.FileResponse
      )?.public_id,
    });

    const [
      uploadDokumenPendukung,
      uploadPenyerahanPiala,
      uploadPiagamPenghargaan,
      uploadUndanganKejuaraan,
    ] = await Promise.all([
      uploadDokumenPendukungPromise,
      uploadPenyerahanPialaPromise,
      uploadPiagamPenghargaanPromise,
      uploadUndanganKejuaraanPromise,
    ]);

    const transformDocument = handleDocumentMetaToString({
      dokumenPendukung: uploadDokumenPendukung,
      fotoPenyerahanPiala: uploadPenyerahanPiala,
      piagamPenghargaan: uploadPiagamPenghargaan,
      undanganKejuaraan: uploadUndanganKejuaraan,
    });

    editPengajuanPrestasi(
      { ...userPayload, ...transformDocument },
      {
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
      }
    );
  };

  const EDIT_PRESTASI_FORM = [
    {
      className: "col-span-2",
      type: "hidden",
      register: { ...registerKejuaraanForm("prestasiDataTableId") },
    },
    {
      labelFontSize: "text-[16px]",
      label: "*Berikan Alasan Anda :",
      placeholder: "Contoh: Dokumen tidak valid",
      type: "textarea",
      className: "col-span-2",
      register: { ...registerKejuaraanForm("catatan") },
      error: errorsRejectForm.catatan?.message,
    },
  ];

  const REJECT_PRESTASI_FORM = [
    {
      className: "col-span-2",
      type: "hidden",
      register: { ...registerRejectForm("prestasiDataTableId") },
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

  const APPROVE_PRESTASI_FORM = [
    {
      trigger: trigger,
      className: "col-span-2",
      type: "hidden",
      register: { ...register("prestasiDataTableId") },
    },
    {
      trigger: trigger,
      className: "col-span-2",
      placeholder: "No. Surat Keputusan",
      label: "No. Surat Keputusan",
      register: { ...register("noSK") },
      error: errors.noSK?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2",
      placeholder: "Tanggal Surat Keputusan",
      label: "Tanggal Surat Keputusan",
      value: new Date(), // Contoh dummy data untuk tanggal kegiatan.
      type: "date",
      control: control,
      register: { ...register("tanggalSK") },
      error: errors.tanggalSK?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2",
      placeholder:
        "Contoh: Dana Beasiswa Akan Cair Tanggal 12 Mei 2023. Diharapkan datang ke kantor BKA setelah dana beasiswa cair.",
      label: "*Tambahkan Catatan :",
      register: { ...register("catatan") },
      type: "textarea",
      error: errors.catatan?.message,
    },
  ];

  const NEW_EDIT_FORMS = [
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Piagam Penghargaan",
      label: "Piagam Penghargaan",
      type: "file",
      register: { ...registerKejuaraanForm("piagamPenghargaan") },
      error: errorsKejuaraanForm.custom?.message,
      fileData: prestasi?.lampiran.piagamPenghargaan,
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Foto Penyerahan Piala",
      label: "Foto Penyerahan Piala",
      type: "file",
      register: { ...registerKejuaraanForm("fotoPenyerahanPiala") },
      error: errorsKejuaraanForm.custom?.message,
      fileData: prestasi?.lampiran.fotoPenyerahanPiala,
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Undangan Kejuaraan",
      label: "Undangan Kejuaraan",
      type: "file",
      register: { ...registerKejuaraanForm("undanganKejuaraan") },
      error: errorsKejuaraanForm.custom?.message,
      fileData: prestasi?.lampiran.undanganKejuaraan,
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Dokumen Pendukung",
      label: "Dokumen Pendukung",
      type: "file",
      register: { ...registerKejuaraanForm("dokumenPendukung") },
      error: errorsKejuaraanForm.custom?.message,
      fileData: prestasi?.lampiran.dokumenPendukung,
    },
  ];

  const TRANSFORM_KEJUARAAN = replaceForms(KEJUARAAN_FORM, NEW_EDIT_FORMS);

  return {
    state,
    setState,
    handleButtonAction,
    APPROVE_PRESTASI_FORM,
    submitApproveKejuaraan,
    onApproveKejuaraan,
    REJECT_PRESTASI_FORM,
    onRejectKejuaraan,
    submitRejectKejuaraan,
    activityLog,
    prestasi,
    renderActionButton,
    isDrawerOpen,
    setIsDrawerOpen,
    onSubmit,
    handleSubmit,
    setDefaultValue,
    isAdmin,
    isLoadingPrestasiData,
    EDIT_PRESTASI_FORM,
    TRANSFORM_KEJUARAAN,
    isAdminAndApproved,
    handleOpenPreview,
    handleClosePreview,
    isPreviewOpen,
  };
};

export { useApproveKejuaraan };
