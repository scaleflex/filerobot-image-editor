export const TOGGLE_DELETE_MODAL = 'TOGGLE_DELETE_MODAL';

const toggleDeleteModal = (state, payload) => ({
  ...state,
  showDeleteModal: payload.showDeleteModal,
});

export default toggleDeleteModal;
