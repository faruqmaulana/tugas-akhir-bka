/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from "react";
import {
  type handleDeleteSelectedDataType,
  type CustomReactSelectOptionsType,
  type ReactSelectOptionType,
} from "~/common/components/ui/form/ReactSelect";
import { useGlobalContext } from "~/common/context/GlobalContext";
import { api } from "~/utils/api";

const useMultiSelectUser = () => {
  const {
    state: { user: userData },
  } = useGlobalContext();
  const { data: user } = api.user.getAllMahasiswa.useQuery();

  const [mahasiswa, setMahasiswa] = useState<
    CustomReactSelectOptionsType[] | []
  >([]);
  const [mahasiswaPayload, setMahasiswaPayload] = useState<
    ReactSelectOptionType[]
  >([]);

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

      const tempUser = user as CustomReactSelectOptionsType[];
      const filteredMahasiswa = tempUser?.filter(
        (val: CustomReactSelectOptionsType) => val.id !== userData?.id
      );
      setMahasiswa(filteredMahasiswa);

      if (mahasiswaPayload?.length > 0) return;
      setMahasiswaPayload([
        {
          label: userData?.name as string,
          value: userData?.id as string,
          isKetua: true,
          disableDelete: true,
        },
      ]);
    }
  }, [user, mahasiswa]);

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
      ) as CustomReactSelectOptionsType[];

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

  return {
    mahasiswa,
    mahasiswaPayload,
    handleMahasiswaLead,
    handleDeleteSelectedMahasiswa,
    handleSelectMultipleUser,
  };
};

export { useMultiSelectUser };
