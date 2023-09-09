import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { customToast } from "~/common/components/ui/toast/showToast";
import {
  type IPengajuanPrestasiForm,
  pengajuanPrestasiForm,
} from "~/common/schemas/module/pengajuan/pengajuan-prestasi.shema";
import { useMultiSelectUser } from "~/common/hooks/module/global/useMultiSelectUser";
import { api } from "~/utils/api";
import { useMainLayout } from "../../layout/useMainLayout";
import { useCurrentUser } from "../profile";

const useKejuaraan = (defaultSelected: any | undefined = undefined) => {
  const {
    mahasiswa,
    mahasiswaPayload,
    handleMahasiswaLead,
    handleDeleteSelectedMahasiswa,
    handleSelectMultipleUser,
  } = useMultiSelectUser(defaultSelected);

  const { refetchNotification } = useMainLayout();
  const { currentUserName } = useCurrentUser();
  const router = useRouter();
  const { data: dosen } = api.dosen.getAllDosen.useQuery();
  const { data: orkem } = api.orkem.getAllOrkem.useQuery();
  const { data: kejuaraan } = api.kejuaraan.getAllTingkatKejuaraan.useQuery();
  const { data: prestasi } = api.prestasi.getAllTingkatPrestasi.useQuery();
  const { data: allKejuaraan } = api.prestasiLomba.getAllKejuaraan.useQuery();
  const { mutate: createPrestasiLomba } =
    api.prestasiLomba.createPrestasiLomba.useMutation();

  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = useForm<IPengajuanPrestasiForm>({
    resolver: zodResolver(pengajuanPrestasiForm),
  });

  useEffect(() => {
    setValue("users", mahasiswaPayload);
    setValue("currentUserName", currentUserName as string);
  }, [mahasiswaPayload, currentUserName, setValue]);

  const onSubmit = useCallback((userPayload: IPengajuanPrestasiForm) => {
    setLoading(true);
    createPrestasiLomba(userPayload, {
      onSuccess: (data) => {
        void refetchNotification();
        customToast("success", data?.message);
        setLoading(false);
        void router.push("/module/kejuaraan");
      },
      onError: (error) => {
        customToast("error", error?.message);
        setLoading(false);
      },
    });
  }, []);

  const KEJUARAAN_FORM = [
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Mahasiswa",
      label: "Nama",
      type: "select",
      control: control,
      selectData: mahasiswa,
      register: { ...register("users") },
      error: errors.users?.message,
      selectedData: mahasiswaPayload,
      handleSwitch: handleMahasiswaLead,
      handleDeleteSelectedData: handleDeleteSelectedMahasiswa,
      handleSelectMultipleUser: handleSelectMultipleUser,
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Dosen",
      label: "Dosen",
      type: "select",
      control: control,
      selectData: dosen,
      register: { ...register("dosenId") },
      error: errors.dosenId?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Kegiatan",
      label: "Kegiatan",
      register: { ...register("kegiatan") },
      error: errors.kegiatan?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Tanggal Kegiatan",
      label: "Tanggal Kegiatan",
      value: new Date(), // Contoh dummy data untuk tanggal kegiatan.
      type: "date",
      control: control,
      register: { ...register("tanggalKegiatan") },
      error: errors.tanggalKegiatan?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Penyelenggara",
      label: "Penyelenggara",
      register: { ...register("penyelenggara") },
      error: errors.penyelenggara?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Orkem",
      label: "Orkem",
      type: "select",
      control: control,
      selectData: orkem,
      register: { ...register("orkemId") },
      error: errors.orkemId?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Tingkat Kejuaraan",
      label: "Tingkat Kejuaraan",
      type: "select",
      control: control,
      selectData: kejuaraan,
      register: { ...register("tingkatKejuaraanId") },
      error: errors.tingkatKejuaraanId?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Tingkat Prestasi",
      label: "Tingkat Prestasi",
      type: "select",
      control: control,
      selectData: prestasi,
      register: { ...register("tingkatPrestasiId") },
      error: errors.tingkatPrestasiId?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Piagam Penghargaan",
      label: "Piagam Penghargaan",
      type: "text",
      register: { ...register("piagamPenghargaan") },
      error: errors.custom?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Foto Penyerahan Piala",
      label: "Foto Penyerahan Piala",
      type: "text",
      register: { ...register("fotoPenyerahanPiala") },
      error: errors.custom?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Undangan Kejuaraan",
      label: "Undangan Kejuaraan",
      type: "text",
      register: { ...register("undanganKejuaraan") },
      error: errors.custom?.message,
    },
    {
      trigger: trigger,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Dokumen Pendukung",
      label: "Dokumen Pendukung",
      type: "text",
      register: { ...register("dokumenPendukung") },
      error: errors.custom?.message,
    },
    {
      type: "hidden",
      register: { ...register("currentUserName") },
      error: errors.currentUserName?.message,
    },
  ];

  return {
    KEJUARAAN_FORM,
    setValue,
    handleSubmit,
    onSubmit,
    loading,
    allKejuaraan,
  };
};

export { useKejuaraan };
