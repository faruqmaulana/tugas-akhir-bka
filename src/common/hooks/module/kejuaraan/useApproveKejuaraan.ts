import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type IApprovePrestasiForm,
  approvePrestasiForm,
  type IRejectPrestasiForm,
  rejectPrestasiForm,
} from "~/common/schemas/module/pengajuan/approve-prestasi.schema";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { customToast } from "~/common/components/ui/toast/showToast";
import { useMainLayout } from "../../layout/useMainLayout";

const INITIAL_STATE = {
  isReject: false,
  isApprove: false,
  isSuccess: false,
  loadingApprove: false,
  loadingReject: false,
};

const useApproveKejuaraan = () => {
  const router = useRouter();
  const [state, setState] = useState(INITIAL_STATE);
  const { refetchNotification } = useMainLayout();
  const prestasiDataTableId = router.query.slug;
  const { mutate: approvePengajuanPrestasi } =
    api.prestasiLomba.approvePengajuanPrestasi.useMutation();
  const { mutate: rejectPengajuanPrestasi } =
    api.prestasiLomba.rejectPengajuanPrestasi.useMutation();

  const {
    register: registerRejectForm,
    setValue: setDefautlRejectValue,
    handleSubmit: submitRejectKejuaraan,
    formState: { errors: errorsRejectForm },
  } = useForm<IRejectPrestasiForm>({
    resolver: zodResolver(rejectPrestasiForm),
  });

  const {
    register,
    setValue,
    handleSubmit: submitApproveKejuaraan,
    trigger,
    control,
    formState: { errors },
  } = useForm<IApprovePrestasiForm>({
    resolver: zodResolver(approvePrestasiForm),
  });

  useEffect(() => {
    setValue("prestasiDataTableId", prestasiDataTableId as string);
    setDefautlRejectValue("prestasiDataTableId", prestasiDataTableId as string);
  }, [prestasiDataTableId, setValue, setDefautlRejectValue]);

  const handleButtonAction = (type: string) => {
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

  const onApproveKejuaraan = useCallback(
    (approvePayload: IApprovePrestasiForm) => {
      setState({ ...state, loadingApprove: true });
      approvePengajuanPrestasi(approvePayload, {
        onSuccess: (data) => {
          void refetchNotification();
          customToast("success", data?.message);
          setState({ ...state, loadingApprove: false });
          if (data?.message) {
            handleButtonAction("close");
          }
        },
        onError: (error) => {
          customToast("error", error?.message);
          setState({ ...state, loadingApprove: false });
        },
      });
    },
    []
  );

  const onRejectKejuaraan = useCallback(
    (rejectPayload: IRejectPrestasiForm) => {
      setState({ ...state, loadingReject: true });
      rejectPengajuanPrestasi(rejectPayload, {
        onSuccess: (data) => {
          void refetchNotification();
          customToast("success", data?.message);
          setState({ ...state, loadingReject: false });
          if (data?.message) {
            handleButtonAction("close");
          }
        },
        onError: (error) => {
          customToast("error", error?.message);
          setState({ ...state, loadingReject: false });
        },
      });
    },
    []
  );

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
  };
};

export { useApproveKejuaraan };
