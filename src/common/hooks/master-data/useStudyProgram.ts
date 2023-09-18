/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { useCallback, useState } from "react";
import { customToast } from "~/common/components/ui/toast/showToast";
import { type InputPropsType } from "~/common/components/ui/form/Input";
import {
  INITIAL_MODAL_STATE,
  type ModalStateType,
} from "~/common/constants/ui/MODAL";
import {
  type IStudyProgramSchema,
  studyProgramSchema,
} from "~/common/schemas/module/master-data/study-program.schema";
import { type AllStudyProgramType } from "~/server/api/module/master-data/study-program/_router";

const useStudyProgram = () => {
  const { mutate: upsertStudyProgram } =
    api.studyProgram.upsertStudyProgram.useMutation();
  const { data: studyProgramData, refetch: refetchStudyProgramData } =
    api.studyProgram.getAllStudyProgram.useQuery();
  const { mutate: deleteStudyProgramData } =
    api.studyProgram.deleteStudyProgram.useMutation();
  const { data: fakultasData } = api.faculty.getAllFaculty.useQuery();

  // ** FAKULTAS STATE
  const [modalState, setModalState] =
    useState<ModalStateType>(INITIAL_MODAL_STATE);

  const [filteredStudyProgram, setFilteredStudyProgram] = useState<
    AllStudyProgramType[0] | undefined
  >(undefined);

  const {
    reset,
    control,
    register,
    setValue,
    handleSubmit: handleUpdateSubmit,
    formState: { errors },
  } = useForm<IStudyProgramSchema>({
    resolver: zodResolver(studyProgramSchema),
  });

  // ** MODAL ACTION */
  // ** HANDLE DELETE STUDY PROGRAM */
  const handleAdd = () => {
    reset();
    setValue("id", "");
    setFilteredStudyProgram(undefined);
    setModalState({ ...INITIAL_MODAL_STATE, isAddModalOpen: true });
  };

  const onAddSubmit = (userPayload: IStudyProgramSchema) => {
    setModalState((prev) => ({ ...prev, isAddLoading: true }));
    upsertStudyProgram(userPayload, {
      onSuccess: (data) => {
        void refetchStudyProgramData();
        customToast("success", data?.message);
        setModalState(INITIAL_MODAL_STATE);
      },
      onError: (error) => {
        customToast("error", error?.message);
        setModalState((prev) => ({ ...prev, isEditLoading: false }));
      },
    });
  };

  // ** HANDLE DELETE STUDY PROGRAM */
  const handleDelete = (data: AllStudyProgramType[0]) => {
    setModalState({
      ...INITIAL_MODAL_STATE,
      detailInfo: data.name,
      isDeleteModalOpen: true,
    });

    const getFilteredStudyProgram = (
      studyProgramData as AllStudyProgramType
    )?.filter((val) => val.id === data.id)[0];

    setFilteredStudyProgram(getFilteredStudyProgram);
  };

  const onDeleteData = () => {
    setModalState((prev) => ({ ...prev, isDeleteLoading: true }));
    deleteStudyProgramData(
      { id: filteredStudyProgram!.id },
      {
        onSuccess: (data) => {
          void refetchStudyProgramData();
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
  const onUpdateSubmit = useCallback((userPayload: IStudyProgramSchema) => {
    setModalState((prev) => ({ ...prev, isEditLoading: true }));
    upsertStudyProgram(userPayload, {
      onSuccess: (data) => {
        void refetchStudyProgramData();
        customToast("success", data?.message);
        setModalState(INITIAL_MODAL_STATE);
      },
      onError: (error) => {
        customToast("error", error?.message);
        setModalState((prev) => ({ ...prev, isEditLoading: false }));
      },
    });
  }, []);

  const handleEdit = (currentData: AllStudyProgramType[0]) => {
    // GET FILTERED LECTURER
    const getFilteredStudyProgram = (
      studyProgramData as AllStudyProgramType
    )?.filter((val) => val.id === currentData.id)[0];
    console.log("getFilteredStudyProgram", getFilteredStudyProgram);
    if (getFilteredStudyProgram) {
      setFilteredStudyProgram(getFilteredStudyProgram);

      handleDefaultEditValue(getFilteredStudyProgram);
      setModalState({ ...INITIAL_MODAL_STATE, isEditModalOpen: true });
    }
  };

  const handleDefaultEditValue = (
    filteredStudyProgram: AllStudyProgramType[0]
  ) => {
    setValue("id", filteredStudyProgram?.id);
    setValue("name", filteredStudyProgram?.name);
    setValue("fakultasId", filteredStudyProgram?.fakultasId);
  };

  const handleClose = () => setModalState(INITIAL_MODAL_STATE);

  const STUDY_PROGRAM_FORM: InputPropsType[] = [
    {
      key: "name",
      className: "col-span-2",
      placeholder: "Nama Prodi",
      label: "Prodi",
      register: register("name"),
      error: errors.name?.message,
    },
    {
      className: "col-span-2",
      placeholder: "Fakultas",
      label: "Fakultas",
      type: "select",
      value: filteredStudyProgram?.fakultasId,
      control: control,
      register: { ...register("fakultasId") },
      selectData: fakultasData,
    },
  ];

  return {
    studyProgramData,
    handleEdit,
    STUDY_PROGRAM_FORM,
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

export { useStudyProgram };
