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
import {
  ActionReducer,
  type AllUsersType,
} from "~/common/types/context/GlobalContextType";
import { type allStudentsType } from "~/server/api/module/user/user";

const useMultiSelectUser = (defaultSelected: any[] | undefined = undefined) => {
  const router = useRouter();
  const isChampionshipPage = router.pathname.includes("/module/kejuaraan");
  const isUserActionType = router.pathname.includes("detail");

  const [addDataWasMet, setAddDataWasMet] = useState(false);
  const [actionTypeWasMet, setActionTypeWasMet] = useState(false);

  const {
    state: { user: userData },
    dispatch,
  } = useGlobalContext();

  const { data: user } = api.user.getAllMahasiswaSelect.useQuery();
  const { data: dosen } = api.lecturer.getAllDosen.useQuery();

  const tempMahasiswaRole = user as CustomReactSelectOptionsType[];
  const tempDosenRole = dosen as CustomReactSelectOptionsType[];

  const mergedUser = [] as CustomReactSelectOptionsType[];

  if (tempMahasiswaRole) {
    tempMahasiswaRole.map((val) => {
      mergedUser.push({ ...val, role: "MAHASISWA" });
    });
  }

  if (!isChampionshipPage && tempDosenRole) {
    tempDosenRole.map((val) => {
      mergedUser.push({ ...val, role: "DOSEN" });
    });
  }

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

  // action to set all users to global state
  useEffect(() => {
    if (!!tempMahasiswaRole?.length) {
      const filteredUsersStucture = (tempMahasiswaRole as allStudentsType).map(
        (val): AllUsersType => {
          return {
            id: val.id,
            name: val.name,
            npm: val.npm,
            prodiName: val.prodi?.name,
            semester: val.semester,
          };
        }
      );

      // Set filtered user to global state
      dispatch({
        type: ActionReducer.UPDATE_ALL_USERS,
        payload: filteredUsersStucture,
      });
    }
  }, [tempMahasiswaRole]);

  // FILTER DATA TO GROUPING MAHASISWA AND DOSEN ROLE DATA
  useEffect(() => {
    const isMahasiswa = mahasiswaPayload.filter(
      (item) => item.role === "MAHASISWA"
    );
    const isDosen = mahasiswaPayload.filter((item) => item.role === "DOSEN");

    setMahasiswaPayload([...isMahasiswa, ...isDosen]);
  }, [mahasiswa]);

  useEffect(() => {
    if (!!mergedUser.length || !!defaultSelected?.length || !mahasiswa) {
      // run when user access action type page
      if (isUserActionType && !!defaultSelected?.length && !actionTypeWasMet) {
        setActionTypeWasMet(true);
        const userIdToKeteranganMap = new Map(
          (defaultSelected as { userId: string; keterangan: string }[])?.map(
            (item) => [item.userId, item.keterangan]
          )
        );

        const userDataWithKeterangan = mergedUser?.map((item) => ({
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
          role: item.role,
        }));

        setMahasiswa(filterUserWithNoKeterangan);
        setMahasiswaPayload(transformedData);
        // STOP PROCESS
        // alert(1);
        return;
      }

      // run when user access add data module page
      if (!addDataWasMet && !!mergedUser.length) {
        // alert(2);
        setAddDataWasMet(true);
        const filteredMahasiswa = mergedUser?.filter(
          (val: CustomReactSelectOptionsType) => val.id !== userData?.id
        );
        setMahasiswa([...filteredMahasiswa]);

        if (mahasiswaPayload?.length > 0) return;
        if (userData?.role !== Role.ADMIN) {
          setMahasiswaPayload([
            {
              label: userData?.name as string,
              value: userData?.id as string,
              isKetua: true,
              disableDelete: true,
              role: "MAHASISWA",
            },
          ]);
        }
      }
    }
  }, [mergedUser, defaultSelected]);

  const handleDeleteSelectedMahasiswa = (
    params: handleDeleteSelectedDataType
  ) => {
    const { context } = params;
    const tempMahasiswa = [...mahasiswaPayload];

    if (Array.isArray(mergedUser)) {
      const updatedMahasiswa = tempMahasiswa.filter(
        (val) => val.value !== context.value
      );

      // if is cuurent deleted is ketua then set ketua to other in index 0 if any
      if (context.isKetua && updatedMahasiswa.length > 0) {
        updatedMahasiswa[0]!.isKetua = true;
      }

      const deletedData = mergedUser.filter(
        (val: CustomReactSelectOptionsType) => val.id === context.value
      );

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
