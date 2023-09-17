import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  type IlecturerSchema,
  lecturerSchema,
} from "~/common/schemas/module/master-data/lecturer/lecturer.schema";
import { api } from "~/utils/api";
import { useCallback, useState } from "react";
import { type SingleValue } from "react-select";
import { type ReactSelectOptionType } from "~/common/components/ui/form/ReactSelect";
import { type AllMasterDataProdiType } from "~/server/api/module/master-data/prodi";
import { type AllDosenType } from "~/server/api/module/master-data/lecturer/_router";
import { customToast } from "~/common/components/ui/toast/showToast";

export type ModalStateType = {
  isEditModalOpen: boolean;
  isAddModalOpen: boolean;
  isDeleteModalOpen: boolean;
  isEditLoading: boolean;
  isAddLoading: boolean;
  isDeleteLoading: boolean;
};

const INITIAL_MODAL_STATE = {
  isEditModalOpen: false,
  isAddModalOpen: false,
  isDeleteModalOpen: false,

  // loader state
  isEditLoading: false,
  isAddLoading: false,
  isDeleteLoading: false,
};

const useDosen = () => {
  const { data: dosenData, refetch: refetchLecturerData } =
    api.lecturer.getAllDosen.useQuery();
  const { data: prodi } = api.prodi.getAllProdi.useQuery();
  const { mutate: updateLecturerData } =
    api.lecturer.updateLecturer.useMutation();

  // ** FAKULTAS STATE
  const [modalState, setModalState] =
    useState<ModalStateType>(INITIAL_MODAL_STATE);

  const [filteredLecturer, setFilteredLecturer] = useState<
    AllDosenType[0] | undefined
  >(undefined);

  const [fakultasState, setFakultasState] = useState<
    | {
        id: string | undefined;
        name: string | undefined;
      }
    | undefined
  >(undefined);

  const {
    register,
    setValue,
    handleSubmit: handleUpdateSubmit,
    control,
    formState: { errors },
  } = useForm<IlecturerSchema>({
    resolver: zodResolver(lecturerSchema),
  });

  // ** MODAL ACTION */

  // ** HANDLE UPDATE FORM */

  const onUpdateSubmit = useCallback((userPayload: IlecturerSchema) => {
    setModalState((prev) => ({ ...prev, isEditLoading: true }));
    updateLecturerData(userPayload, {
      onSuccess: (data) => {
        void refetchLecturerData();
        customToast("success", data?.message);
        setModalState(INITIAL_MODAL_STATE);
      },
      onError: (error) => {
        customToast("error", error?.message);
        setModalState((prev) => ({ ...prev, isEditLoading: false }));
      },
    });
  }, []);

  const handleEdit = (currentData: AllDosenType[0]) => {
    // GET FILTERED LECTURER
    const getFilteredLecturer = (dosenData as AllDosenType)?.filter(
      (val) => val.id === currentData.id
    )[0];

    if (getFilteredLecturer) {
      setFilteredLecturer(getFilteredLecturer);

      setFakultasState({
        id: getFilteredLecturer?.prodi?.Fakultas.id,
        name: getFilteredLecturer?.prodi?.Fakultas.name,
      });

      handleDefaultEditValue(getFilteredLecturer);

      setModalState({ ...INITIAL_MODAL_STATE, isEditModalOpen: true });
    }
  };

  const handleDefaultEditValue = (filteredLecturer: AllDosenType[0]) => {
    setValue("id", filteredLecturer?.id);
    setValue("name", filteredLecturer?.name);
    setValue("nidn", filteredLecturer?.nidn);
    setValue("prodiId", filteredLecturer?.prodi?.id || "");
  };

  const handleClose = () => setModalState(INITIAL_MODAL_STATE);

  // ** HANDLE FAKULTAS STATE WHEN PRODI WAS CHANGE
  const handleFakultasChange = (
    selectState: SingleValue<ReactSelectOptionType>
  ) => {
    const tempProdi: AllMasterDataProdiType = prodi as AllMasterDataProdiType;
    const filteredProdi: AllMasterDataProdiType = tempProdi?.filter(
      (val) => val.id === selectState?.value
    );
    setFakultasState({
      id: filteredProdi[0]?.Fakultas?.id,
      name: filteredProdi[0]?.Fakultas?.name,
    });
  };

  const DOSEN_FORM = [
    {
      key: "name",
      className: "col-span-2",
      placeholder: "Nama Dosen",
      label: "Dosen",
      register: register("name"),
    },
    {
      key: "nidn",
      className: "col-span-2",
      placeholder: "NIDN Dosen",
      label: "NIDN",
      register: register("nidn"),
    },
    {
      disabled: true,
      className: "col-span-2",
      placeholder: "Fakultas",
      label: "Fakultas",
      type: "select",
      value: fakultasState?.id,
      control: control,
      selectData: [
        {
          id: fakultasState?.id,
          title: fakultasState?.name,
        },
      ],
    },
    {
      className: "col-span-2",
      placeholder: "Prodi",
      label: "Prodi",
      type: "select",
      isLoading: !prodi,
      value: filteredLecturer?.prodi?.id,
      control: control,
      register: { ...register("prodiId") },
      handleSelectOptionChange: handleFakultasChange,
      selectData: prodi || [
        {
          id: filteredLecturer?.prodi?.id,
          title: filteredLecturer?.prodi?.name,
        },
      ],
      error: errors.prodiId?.message,
    },
  ];

  return {
    dosenData,
    handleEdit,
    DOSEN_FORM,
    modalState,
    handleClose,
    handleUpdateSubmit,
    onUpdateSubmit,
  };
};

export { useDosen };
