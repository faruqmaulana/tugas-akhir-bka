/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  type handleDeleteSelectedDataType,
  type CustomReactSelectOptionsType,
  type ReactSelectOptionType,
} from "~/common/components/ui/form/ReactSelect";
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
  const [mahasiswa, setMahasiswa] = useState<
    CustomReactSelectOptionsType[] | []
  >([]);
  const [mahasiswaPayload, setMahasiswaPayload] = useState<
    ReactSelectOptionType[]
  >([]);

  const [dosenData, setDosenData] = useState<
    CustomReactSelectOptionsType[] | []
  >([]);
  const [dosenPayload, setDosenPayload] = useState<ReactSelectOptionType[]>([]);

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
    setValue("dosenData", dosenPayload);
  }, [mahasiswaPayload, dosenPayload, setValue]);

  const onSubmit = useCallback((userPayload: IPengajuanPrestasiForm) => {
    console.log("userPayload", userPayload);
    // setLoading(true);
    // createPrestasiLomba(userPayload, {
    //   onSuccess: (data) => {
    //     customToast("success", data?.message);
    //     setLoading(false);
    //   },
    //   onError: (error) => {
    //     customToast("error", error?.message);
    //     setLoading(false);
    //   },
    // });
  }, []);

  const handleSelectMultipleUser = (ctx: ReactSelectOptionType) => {
    if (!ctx) return;
    setMahasiswaPayload([
      ...mahasiswaPayload,
      { ...ctx, isKetua: mahasiswaPayload.length > 0 ? false : true },
    ]);
    const tempMahasiswa = mahasiswa?.filter((val) => val.id !== ctx?.value);

    setMahasiswa(tempMahasiswa);
  };

  useEffect(() => {
    if (user || mahasiswa) {
      if (mahasiswa?.length > 0) return;
      setMahasiswa(user as CustomReactSelectOptionsType[]);
    }
  }, [user]);

  const handleDeleteSelectedMahasiswa = (
    params: handleDeleteSelectedDataType
  ) => {
    const { context } = params;
    const tempMahasiswa = [...mahasiswaPayload];

    if (Array.isArray(user)) {
      const updatedMahasiswa = tempMahasiswa.filter(
        (val) => val.value !== context.value
      );

      // if is cuurent deleted is ketua then set ketua to other in index 0 if any
      if (context.isKetua && updatedMahasiswa.length > 0) {
        updatedMahasiswa[0]!.isKetua = true;
      }

      const deletedData = user.filter(
        (val: CustomReactSelectOptionsType) => val.id === context.value
      );

      setMahasiswaPayload(updatedMahasiswa);
      setMahasiswa([...mahasiswa, ...deletedData]);
    }
  };

  const handleMahasiswaLead = (id: string) => {
    const tempMahasiswa = [...mahasiswaPayload];

    tempMahasiswa.forEach((val, i) => {
      if (id === val.value) {
        tempMahasiswa[i]!.isKetua = true;
      } else {
        tempMahasiswa[i]!.isKetua = false;
      }
    });

    setMahasiswaPayload(tempMahasiswa);
  };

  // DOSEN
  const handleSelectMultipleDosen = (ctx: ReactSelectOptionType) => {
    if (!ctx) return;
    setDosenPayload([
      ...dosenPayload,
      { ...ctx, isKetua: dosenPayload.length > 0 ? false : true },
    ]);
    const tempDosen = dosenData?.filter((val) => val.id !== ctx?.value);

    setDosenData(tempDosen);
  };

  useEffect(() => {
    if (dosen || dosenData) {
      if (dosenData?.length > 0) return;
      setDosenData(dosen as CustomReactSelectOptionsType[]);
    }
  }, [dosen]);

  const handleDeleteSelectedDosen = (params: handleDeleteSelectedDataType) => {
    const { context } = params;
    const tempDosenPayload = [...dosenPayload];
    if (Array.isArray(dosen)) {
      const updatedMahasiswa = tempDosenPayload.filter(
        (val) => val.value !== context.value
      );

      // if is cuurent deleted is ketua then set ketua to other in index 0 if any
      if (context.isKetua && updatedMahasiswa.length > 0) {
        updatedMahasiswa[0]!.isKetua = true;
      }

      const deletedData = dosen.filter(
        (val: CustomReactSelectOptionsType) => val.id === context.value
      );

      setDosenPayload(updatedMahasiswa);
      setDosenData([...dosenData, ...deletedData]);
    }
  };

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
      selectData: dosenData,
      register: { ...register("dosenData") },
      error: errors.dosenData?.message,
      selectedData: dosenPayload,
      handleDeleteSelectedData: handleDeleteSelectedDosen,
      handleSelectMultipleUser: handleSelectMultipleDosen,
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
  ];

  return { KEJUARAAN_FORM, handleSubmit, onSubmit, loading };
};

export { useKejuaraan };
