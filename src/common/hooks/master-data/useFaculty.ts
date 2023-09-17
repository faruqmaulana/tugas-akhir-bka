/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { useCallback, useState } from "react";
import { customToast } from "~/common/components/ui/toast/showToast";
import { type InputPropsType } from "~/common/components/ui/form/Input";
import { type AllFacultyType } from "~/server/api/module/master-data/faculty/_router";
import {
  type IFacultySchema,
  facultySchema,
} from "~/common/schemas/module/master-data/faculty.schema";

export type ModalStateType = {
  isEditModalOpen: boolean;
  isAddModalOpen: boolean;
  isDeleteModalOpen: boolean;
  isEditLoading: boolean;
  isAddLoading: boolean;
  isDeleteLoading: boolean;
  detailInfo: string | undefined;
};

const INITIAL_MODAL_STATE = {
  isEditModalOpen: false,
  isAddModalOpen: false,
  isDeleteModalOpen: false,

  // loader state
  isEditLoading: false,
  isAddLoading: false,
  isDeleteLoading: false,

  // detail info
  detailInfo: undefined,
};

const useFaculty = () => {
  const { mutate: upsertFaculty } = api.faculty.upsertFaculty.useMutation();
  const { data: facultyData, refetch: refetchLecturerData } =
    api.faculty.getAllFaculty.useQuery();
  const { mutate: deleteFacultyData } = api.faculty.deleteFaculty.useMutation();

  // ** FAKULTAS STATE
  const [modalState, setModalState] =
    useState<ModalStateType>(INITIAL_MODAL_STATE);

  const [filteredFaculty, setFilteredFaculty] = useState<
    AllFacultyType[0] | undefined
  >(undefined);

  const {
    register,
    setValue,
    reset,
    handleSubmit: handleUpdateSubmit,
    formState: { errors },
  } = useForm<IFacultySchema>({
    resolver: zodResolver(facultySchema),
  });

  // ** MODAL ACTION */
  // ** HANDLE DELETE FACULTY */
  const handleAdd = () => {
    reset();
    setValue("id", "");
    setFilteredFaculty(undefined);
    setModalState({ ...INITIAL_MODAL_STATE, isAddModalOpen: true });
  };

  const onAddSubmit = (userPayload: IFacultySchema) => {
    setModalState((prev) => ({ ...prev, isAddLoading: true }));
    upsertFaculty(userPayload, {
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
  };

  // ** HANDLE DELETE FACULTY */
  const handleDelete = (data: AllFacultyType[0]) => {
    setModalState({
      ...INITIAL_MODAL_STATE,
      detailInfo: data.name,
      isDeleteModalOpen: true,
    });

    const getFilteredFaculty = (facultyData as AllFacultyType)?.filter(
      (val) => val.id === data.id
    )[0];

    setFilteredFaculty(getFilteredFaculty);
  };

  const onDeleteData = () => {
    setModalState((prev) => ({ ...prev, isDeleteLoading: true }));
    deleteFacultyData(
      { id: filteredFaculty!.id },
      {
        onSuccess: (data) => {
          void refetchLecturerData();
          customToast("success", data.message);
          setModalState(INITIAL_MODAL_STATE);
        },
        onError: (error) => {
          customToast("error", error?.message);
          setModalState((prev) => ({ ...prev, isDeleteLoading: false }));
        },
      }
    );
  };

  // ** HANDLE UPDATE FORM */
  const onUpdateSubmit = useCallback((userPayload: IFacultySchema) => {
    setModalState((prev) => ({ ...prev, isEditLoading: true }));
    upsertFaculty(userPayload, {
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

  const handleEdit = (currentData: AllFacultyType[0]) => {
    // GET FILTERED LECTURER
    const getFilteredFaculty = (facultyData as AllFacultyType)?.filter(
      (val) => val.id === currentData.id
    )[0];

    console.log("getFilteredFaculty", getFilteredFaculty);
    if (getFilteredFaculty) {
      setFilteredFaculty(getFilteredFaculty);

      handleDefaultEditValue(getFilteredFaculty);
      setModalState({ ...INITIAL_MODAL_STATE, isEditModalOpen: true });
    }
  };

  const handleDefaultEditValue = (filteredFaculty: AllFacultyType[0]) => {
    setValue("id", filteredFaculty?.id);
    setValue("name", filteredFaculty?.name);
  };

  const handleClose = () => setModalState(INITIAL_MODAL_STATE);

  const FACULTY_FORM: InputPropsType[] = [
    {
      key: "name",
      className: "col-span-2",
      placeholder: "Nama Fakultas",
      label: "Fakultas",
      register: register("name"),
      error: errors.name?.message,
    },
  ];

  return {
    facultyData,
    handleEdit,
    FACULTY_FORM,
    modalState,
    handleClose,
    handleUpdateSubmit,
    onUpdateSubmit,
    handleDelete,
    onDeleteData,
    handleAdd,
    onAddSubmit,
  };
};

export { useFaculty };
