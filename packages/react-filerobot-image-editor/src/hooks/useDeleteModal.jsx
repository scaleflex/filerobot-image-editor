/** External dependencies */
import { useCallback, useMemo } from 'react';

/** Internal dependencies */
import { TOGGLE_DELETE_MODAL } from 'actions';
import useDispatch from './useDispatch';
import useStore from './useStore';

const useDeleteModal = () => {
  const dispatch = useDispatch();
  const { showDeleteModal } = useStore();

  const toggleDeleteModal = useCallback(() => {
    dispatch({
      type: TOGGLE_DELETE_MODAL,
      payload: {
        showDeleteModal: !showDeleteModal,
      },
    });
  }, [showDeleteModal]);

  return useMemo(
    () => ({
      showDeleteModal,
      toggleDeleteModal,
    }),
    [showDeleteModal, toggleDeleteModal],
  );
};

export default useDeleteModal;
