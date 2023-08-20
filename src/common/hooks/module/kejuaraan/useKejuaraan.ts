import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { customToast } from "~/common/components/ui/toast/showToast";
import {
  type IPengajuanPrestasiForm,
  pengajuanPrestasiForm,
} from "~/common/schemas/module/pengajuan/pengajuan-prestasi.shema";
import { api } from "~/utils/api";

const useKejuaraan = () => {
  const { data: user } = api.user.getAllMahasiswa.useQuery();
  const { data: dosen } = api.dosen.getAllDosen.useQuery();
  const { data: orkem } = api.orkem.getAllOrkem.useQuery();
  const { data: kejuaraan } = api.kejuaraan.getAllTingkatKejuaraan.useQuery();
  const { data: prestasi } = api.prestasi.getAllTingkatPrestasi.useQuery();
  const { mutate: createPrestasiLomba } =
    api.prestasiLomba.createPrestasiLomba.useMutation();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPengajuanPrestasiForm>({
    resolver: zodResolver(pengajuanPrestasiForm),
  });

  const onSubmit = useCallback((userPayload: IPengajuanPrestasiForm) => {
    setLoading(true);
    createPrestasiLomba(userPayload, {
      onSuccess: (data) => {
        customToast("success", data?.message);
        setLoading(false);
      },
      onError: (error) => {
        customToast("error", error?.message);
        setLoading(false);
      },
    });
  }, []);

  const KEJUARAAN_FORM = [
    {
      className: "col-span-1",
      placeholder: "Mahasiswa",
      label: "Nama",
      type: "select",
      selectData: user,
      register: { ...register("userId") },
      error: errors.userId?.message,
    },
    {
      className: "col-span-1",
      placeholder: "Dosen",
      label: "Dosen",
      type: "select",
      selectData: dosen,
      register: { ...register("dosenId") },
      error: errors.dosenId?.message,
    },
    {
      className: "col-span-1",
      placeholder: "Kegiatan",
      label: "Kegiatan",
      register: { ...register("kegiatan") },
      error: errors.kegiatan?.message,
    },
    {
      className: "col-span-1",
      placeholder: "Tanggal Kegiatan",
      label: "Tanggal Kegiatan",
      value: new Date(), // Contoh dummy data untuk tanggal kegiatan.
      type: "date",
      register: { ...register("tanggalKegiatan") },
      error: errors.tanggalKegiatan?.message,
    },
    {
      className: "col-span-1",
      placeholder: "Penyelenggara",
      label: "Penyelenggara",
      register: { ...register("penyelenggara") },
      error: errors.penyelenggara?.message,
    },
    {
      className: "col-span-1",
      placeholder: "Orkem",
      label: "Orkem",
      type: "select",
      selectData: orkem,
      register: { ...register("orkemId") },
      error: errors.orkemId?.message,
    },
    {
      className: "col-span-1",
      placeholder: "Tingkat Kejuaraan",
      label: "Tingkat Kejuaraan",
      type: "select",
      selectData: kejuaraan,
      register: { ...register("tingkatKejuaraanId") },
      error: errors.tingkatKejuaraanId?.message,
    },
    {
      className: "col-span-1",
      placeholder: "Tingkat Prestasi",
      label: "Tingkat Prestasi",
      type: "select",
      selectData: prestasi,
      register: { ...register("tingkatPrestasiId") },
      error: errors.tingkatPrestasiId?.message,
    },
    {
      className: "col-span-1",
      placeholder: "Piagam Penghargaan",
      label: "Piagam Penghargaan",
      type: "text",
      register: { ...register("piagamPenghargaan") },
      error: errors.custom?.message,
    },
    {
      className: "col-span-1",
      placeholder: "Foto Penyerahan Piala",
      label: "Foto Penyerahan Piala",
      type: "text",
      register: { ...register("fotoPenyerahanPiala") },
      error: errors.custom?.message,
    },
    {
      className: "col-span-1",
      placeholder: "Undangan Kejuaraan",
      label: "Undangan Kejuaraan",
      type: "text",
      register: { ...register("undanganKejuaraan") },
      error: errors.custom?.message,
    },
    {
      className: "col-span-1",
      placeholder: "Dokumen Pendukung",
      label: "Dokumen Pendukung",
      type: "text",
      register: { ...register("dokumenPendukung") },
      error: errors.custom?.message,
    },
  ];

  return { KEJUARAAN_FORM, handleSubmit, onSubmit, loading };
};

export { useKejuaraan };
