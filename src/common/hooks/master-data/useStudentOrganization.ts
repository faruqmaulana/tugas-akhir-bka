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
import { type AllStudentOrganizationType } from "~/server/api/module/master-data/student-organization/_router";
import {
  type IStudentOrganizationSchema,
  studentOrganizationSchema,
} from "~/common/schemas/module/master-data/studentOrganization.schema";

const useStudentOrganization = () => {
  const { mutate: upsertStudentOrganization } =
    api.studentOrganization.upsertStudentOrganization.useMutation();
  const { data: StudentOrganization, refetch: refetchStudentOrganization } =
    api.studentOrganization.getAllStudentOrganization.useQuery();
  const { mutate: deleteStudentOrganization } =
    api.studentOrganization.deleteStudentOrganization.useMutation();

  // ** STUDENT ORGANIZATION STATE
  const [modalState, setModalState] =
    useState<ModalStateType>(INITIAL_MODAL_STATE);

  const [filteredStudentOrganization, setFilteredStudentOrganization] =
    useState<AllStudentOrganizationType[0] | undefined>(undefined);

  const {
    register,
    setValue,
    reset,
    handleSubmit: handleUpdateSubmit,
    formState: { errors },
  } = useForm<IStudentOrganizationSchema>({
    resolver: zodResolver(studentOrganizationSchema),
  });

  // ** MODAL ACTION */
  // ** HANDLE DELETE STUDENT ORGANIZATION */
  const handleAdd = () => {
    reset();
    setValue("id", "");
    setFilteredStudentOrganization(undefined);
    setModalState({ ...INITIAL_MODAL_STATE, isAddModalOpen: true });
  };

  const onAddSubmit = (userPayload: IStudentOrganizationSchema) => {
    setModalState((prev) => ({ ...prev, isAddLoading: true }));
    upsertStudentOrganization(userPayload, {
      onSuccess: (data) => {
        void refetchStudentOrganization();
        customToast("success", data?.message);
        setModalState(INITIAL_MODAL_STATE);
      },
      onError: (error) => {
        customToast("error", error?.message);
        setModalState((prev) => ({ ...prev, isEditLoading: false }));
      },
    });
  };

  // ** HANDLE DELETE STUDENT ORGANIZATION */
  const handleDelete = (data: AllStudentOrganizationType[0]) => {
    setModalState({
      ...INITIAL_MODAL_STATE,
      detailInfo: data.name,
      isDeleteModalOpen: true,
    });

    const getFilteredStudentOrganization = (
      StudentOrganization as AllStudentOrganizationType
    )?.filter((val) => val.id === data.id)[0];

    setFilteredStudentOrganization(getFilteredStudentOrganization);
  };

  const onDeleteData = () => {
    setModalState((prev) => ({ ...prev, isDeleteLoading: true }));
    deleteStudentOrganization(
      { id: filteredStudentOrganization!.id },
      {
        onSuccess: (data) => {
          void refetchStudentOrganization();
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
  const onUpdateSubmit = useCallback(
    (userPayload: IStudentOrganizationSchema) => {
      setModalState((prev) => ({ ...prev, isEditLoading: true }));
      upsertStudentOrganization(userPayload, {
        onSuccess: (data) => {
          void refetchStudentOrganization();
          customToast("success", data?.message);
          setModalState(INITIAL_MODAL_STATE);
        },
        onError: (error) => {
          customToast("error", error?.message);
          setModalState((prev) => ({ ...prev, isEditLoading: false }));
        },
      });
    },
    []
  );

  const handleEdit = (currentData: AllStudentOrganizationType[0]) => {
    // GET FILTERED LECTURER
    const getFilteredStudentOrganization = (
      StudentOrganization as AllStudentOrganizationType
    )?.filter((val) => val.id === currentData.id)[0];

    if (getFilteredStudentOrganization) {
      setFilteredStudentOrganization(getFilteredStudentOrganization);

      handleDefaultEditValue(getFilteredStudentOrganization);
      setModalState({ ...INITIAL_MODAL_STATE, isEditModalOpen: true });
    }
  };

  const handleDefaultEditValue = (
    filteredStudentOrganization: AllStudentOrganizationType[0]
  ) => {
    setValue("id", filteredStudentOrganization?.id);
    setValue("name", filteredStudentOrganization?.name);
  };

  const handleClose = () => setModalState(INITIAL_MODAL_STATE);

  const STUDENT_ORGANIZATION_FORM: InputPropsType[] = [
    {
      key: "name",
      className: "col-span-2",
      placeholder: "Nama Organisasi Kemahasiswaan",
      label: "Organisasi Kemahasiswaan",
      register: register("name"),
      error: errors.name?.message,
    },
  ];

  return {
    StudentOrganization,
    handleEdit,
    STUDENT_ORGANIZATION_FORM,
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

export { useStudentOrganization };
