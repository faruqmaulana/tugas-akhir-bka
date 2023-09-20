/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  type handleDeleteSelectedDataType,
  type CustomReactSelectOptionsType,
  type ReactSelectOptionType,
} from "~/common/components/ui/form/ReactSelect";
import { useGlobalContext } from "~/common/context/GlobalContext";
import { getUserLeadBoolean } from "~/common/helpers/getUserLead";
import { api } from "~/utils/api";
import { Role } from "@prisma/client";
import { type SingleValue } from "react-select";

const useMultiSelectUser = (defaultSelected: any | undefined = undefined) => {
  const {
    state: { user: userData },
  } = useGlobalContext();

  const { data: user } = api.user.getAllMahasiswaSelect.useQuery();
  const router = useRouter();

  const [mahasiswa, setMahasiswa] = useState<
    CustomReactSelectOptionsType[] | [] | undefined
  >(undefined);
  const [mahasiswaPayload, setMahasiswaPayload] = useState<
    ReactSelectOptionType[]
  >([]);

  const handleSelectMultipleUser = (
    ctx: SingleValue<ReactSelectOptionType>
  ) => {
    if (!ctx) return;
    setMahasiswaPayload([
      ...mahasiswaPayload,
      { ...ctx, isKetua: mahasiswaPayload.length > 0 ? false : true },
    ]);
    const tempMahasiswa = mahasiswa?.filter((val) => val.id !== ctx?.value);

    setMahasiswa(tempMahasiswa);
  };

  useEffect(() => {
    if (user || mahasiswa || defaultSelected) {
      if (defaultSelected) {
        const userIdToKeteranganMap = new Map(
          (defaultSelected as { userId: string; keterangan: string }[])?.map(
            (item) => [item.userId, item.keterangan]
          )
        );

        const userDataWithKeterangan = (
          user as CustomReactSelectOptionsType[]
        )?.map((item) => ({
          ...item,
          keterangan: userIdToKeteranganMap.get(item.id as string),
        }));

        const filterUserDataWithKeterangan = userDataWithKeterangan?.filter(
          (item) => item.keterangan
        );

        const filterUserWithNoKeterangan = userDataWithKeterangan?.filter(
          (item) => !item.keterangan
        );

        const transformedData = filterUserDataWithKeterangan?.map((item) => ({
          label: item.name as string,
          value: item.id as string,
          isKetua: getUserLeadBoolean(item.keterangan as string),
          disableDelete: item.id === userData?.id,
        }));

        setMahasiswa(filterUserWithNoKeterangan);
        setMahasiswaPayload(transformedData);

        // STOP PROCESS
        return;
      }

      const tempUser = user as CustomReactSelectOptionsType[];
      const filteredMahasiswa = tempUser?.filter(
        (val: CustomReactSelectOptionsType) => val.id !== userData?.id
      );
      setMahasiswa(filteredMahasiswa);

      if (mahasiswaPayload?.length > 0) return;
      if (userData?.role !== Role.ADMIN) {
        setMahasiswaPayload([
          {
            label: userData?.name as string,
            value: userData?.id as string,
            isKetua: true,
            disableDelete: true,
          },
        ]);
      }
    }
  }, [user, defaultSelected, router]);

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
      setMahasiswa([
        ...(mahasiswa as CustomReactSelectOptionsType[] | []),
        ...deletedData,
      ]);
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
