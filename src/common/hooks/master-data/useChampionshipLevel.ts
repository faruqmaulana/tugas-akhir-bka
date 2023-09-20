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
import { type AllChampionshipLevelType } from "~/server/api/module/master-data/championship-level/_router";
import {
  type IChampionshipLevelSchema,
  championshipLevelSchema,
} from "~/common/schemas/module/master-data/championship-level.schema";

const useChampionshipLevel = () => {
  const { mutate: upsertChampionshipLevel } =
    api.championshipLevel.upsertChampionshipLevel.useMutation();
  const { data: championshipLevelData, refetch: refetchChampionshipLevel } =
    api.championshipLevel.getAllChampionshipLevel.useQuery();
  const { mutate: deleteChampionshipLevelData } =
    api.championshipLevel.deleteChampionshipLevel.useMutation();

  // ** CHAMPIONSHIP LEVEL STATE
  const [modalState, setModalState] =
    useState<ModalStateType>(INITIAL_MODAL_STATE);

  const [filteredChampionshipLevel, setFilteredChampionshipLevel] = useState<
    AllChampionshipLevelType[0] | undefined
  >(undefined);

  const {
    register,
    setValue,
    reset,
    handleSubmit: handleUpdateSubmit,
    formState: { errors },
  } = useForm<IChampionshipLevelSchema>({
    resolver: zodResolver(championshipLevelSchema),
  });

  // ** MODAL ACTION */
  // ** HANDLE DELETE CHAMPIONSHIP LEVEL */
  const handleAdd = () => {
    reset();
    setValue("id", "");
    setFilteredChampionshipLevel(undefined);
    setModalState({ ...INITIAL_MODAL_STATE, isAddModalOpen: true });
  };

  const onAddSubmit = (userPayload: IChampionshipLevelSchema) => {
    setModalState((prev) => ({ ...prev, isAddLoading: true }));
    upsertChampionshipLevel(userPayload, {
      onSuccess: (data) => {
        void refetchChampionshipLevel();
        customToast("success", data?.message);
        setModalState(INITIAL_MODAL_STATE);
      },
      onError: (error) => {
        customToast("error", error?.message);
        setModalState((prev) => ({ ...prev, isEditLoading: false }));
      },
    });
  };

  // ** HANDLE DELETE CHAMPIONSHIP LEVEL */
  const handleDelete = (data: AllChampionshipLevelType[0]) => {
    setModalState({
      ...INITIAL_MODAL_STATE,
      detailInfo: data.name,
      isDeleteModalOpen: true,
    });

    const getFilteredChampionshipLevel = (
      championshipLevelData as AllChampionshipLevelType
    )?.filter((val) => val.id === data.id)[0];

    setFilteredChampionshipLevel(getFilteredChampionshipLevel);
  };

  const onDeleteData = () => {
    setModalState((prev) => ({ ...prev, isDeleteLoading: true }));
    deleteChampionshipLevelData(
      { id: filteredChampionshipLevel!.id },
      {
        onSuccess: (data) => {
          void refetchChampionshipLevel();
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
    (userPayload: IChampionshipLevelSchema) => {
      setModalState((prev) => ({ ...prev, isEditLoading: true }));
      upsertChampionshipLevel(userPayload, {
        onSuccess: (data) => {
          void refetchChampionshipLevel();
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

  const handleEdit = (currentData: AllChampionshipLevelType[0]) => {
    // GET FILTERED LECTURER
    const getFilteredChampionshipLevel = (
      championshipLevelData as AllChampionshipLevelType
    )?.filter((val) => val.id === currentData.id)[0];

    if (getFilteredChampionshipLevel) {
      setFilteredChampionshipLevel(getFilteredChampionshipLevel);

      handleDefaultEditValue(getFilteredChampionshipLevel);
      setModalState({ ...INITIAL_MODAL_STATE, isEditModalOpen: true });
    }
  };

  const handleDefaultEditValue = (
    filteredChampionshipLevel: AllChampionshipLevelType[0]
  ) => {
    setValue("id", filteredChampionshipLevel?.id);
    setValue("name", filteredChampionshipLevel?.name);
  };

  const handleClose = () => setModalState(INITIAL_MODAL_STATE);

  const CHAMPIONSHIP_LEVEL_FORM: InputPropsType[] = [
    {
      key: "name",
      className: "col-span-2",
      placeholder: "Nama Tingkat Kejuaraan",
      label: "Tingkat Kejuaraan",
      register: register("name"),
      error: errors.name?.message,
    },
  ];

  return {
    championshipLevelData,
    handleEdit,
    CHAMPIONSHIP_LEVEL_FORM,
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

export { useChampionshipLevel };
