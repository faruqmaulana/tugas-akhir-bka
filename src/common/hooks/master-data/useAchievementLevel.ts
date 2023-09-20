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
import { type AllAchievementLevelType } from "~/server/api/module/master-data/achievement-level/_router";
import {
  type IAchievementLevelSchema,
  achievementLevelSchema,
} from "~/common/schemas/module/master-data/achievement-level.schema";

const useAchievementLevel = () => {
  const { mutate: upsertAchievementLevel } =
    api.achievementLevel.upsertAchievementLevel.useMutation();
  const { data: achievementLevelData, refetch: refetchAchievementLevel } =
    api.achievementLevel.getAllAchievementLevel.useQuery<AllAchievementLevelType>();
  const { mutate: deleteAchievementLevelData } =
    api.achievementLevel.deleteAchievementLevel.useMutation();

  // ** Achievement LEVEL STATE
  const [modalState, setModalState] =
    useState<ModalStateType>(INITIAL_MODAL_STATE);

  const [filteredAchievementLevel, setFilteredAchievementLevel] = useState<
    AllAchievementLevelType[0] | undefined
  >(undefined);

  const {
    register,
    setValue,
    reset,
    handleSubmit: handleUpdateSubmit,
    formState: { errors },
  } = useForm<IAchievementLevelSchema>({
    resolver: zodResolver(achievementLevelSchema),
  });

  // ** MODAL ACTION */
  // ** HANDLE DELETE Achievement LEVEL */
  const handleAdd = () => {
    reset();
    setValue("id", "");
    setFilteredAchievementLevel(undefined);
    setModalState({ ...INITIAL_MODAL_STATE, isAddModalOpen: true });
  };

  const onAddSubmit = (userPayload: IAchievementLevelSchema) => {
    setModalState((prev) => ({ ...prev, isAddLoading: true }));
    upsertAchievementLevel(userPayload, {
      onSuccess: (data) => {
        void refetchAchievementLevel();
        customToast("success", data?.message);
        setModalState(INITIAL_MODAL_STATE);
      },
      onError: (error) => {
        customToast("error", error?.message);
        setModalState((prev) => ({ ...prev, isEditLoading: false }));
      },
    });
  };

  // ** HANDLE DELETE Achievement LEVEL */
  const handleDelete = (data: AllAchievementLevelType[0]) => {
    setModalState({
      ...INITIAL_MODAL_STATE,
      detailInfo: data.name,
      isDeleteModalOpen: true,
    });

    const getFilteredAchievementLevel = achievementLevelData?.filter(
      (val) => val.id === data.id
    )[0];

    setFilteredAchievementLevel(getFilteredAchievementLevel);
  };

  const onDeleteData = () => {
    setModalState((prev) => ({ ...prev, isDeleteLoading: true }));
    deleteAchievementLevelData(
      { id: filteredAchievementLevel!.id },
      {
        onSuccess: (data) => {
          void refetchAchievementLevel();
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
  const onUpdateSubmit = useCallback((userPayload: IAchievementLevelSchema) => {
    setModalState((prev) => ({ ...prev, isEditLoading: true }));
    upsertAchievementLevel(userPayload, {
      onSuccess: (data) => {
        void refetchAchievementLevel();
        customToast("success", data?.message);
        setModalState(INITIAL_MODAL_STATE);
      },
      onError: (error) => {
        customToast("error", error?.message);
        setModalState((prev) => ({ ...prev, isEditLoading: false }));
      },
    });
  }, []);

  const handleEdit = (currentData: AllAchievementLevelType[0]) => {
    // GET FILTERED LECTURER
    const getFilteredAchievementLevel = achievementLevelData?.filter(
      (val) => val.id === currentData.id
    )[0];

    if (getFilteredAchievementLevel) {
      setFilteredAchievementLevel(getFilteredAchievementLevel);

      handleDefaultEditValue(getFilteredAchievementLevel);
      setModalState({ ...INITIAL_MODAL_STATE, isEditModalOpen: true });
    }
  };

  const handleDefaultEditValue = (
    filteredAchievementLevel: AllAchievementLevelType[0]
  ) => {
    setValue("id", filteredAchievementLevel?.id);
    setValue("name", filteredAchievementLevel?.name);
  };

  const handleClose = () => setModalState(INITIAL_MODAL_STATE);

  const ACHIEVEMENT_LEVEL_FORM: InputPropsType[] = [
    {
      key: "name",
      className: "col-span-2",
      placeholder: "Nama Tingkat Prestasi",
      label: "Tingkat Prestasi",
      register: register("name"),
      error: errors.name?.message,
    },
  ];

  return {
    achievementLevelData,
    handleEdit,
    ACHIEVEMENT_LEVEL_FORM,
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

export { useAchievementLevel };
