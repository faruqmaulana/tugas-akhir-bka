export type ModalStateType = {
  isEditModalOpen: boolean;
  isAddModalOpen: boolean;
  isDeleteModalOpen: boolean;
  isEditLoading: boolean;
  isAddLoading: boolean;
  isDeleteLoading: boolean;
  detailInfo: string | undefined;
};

export const INITIAL_MODAL_STATE = {
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
