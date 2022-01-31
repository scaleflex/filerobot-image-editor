/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import Popup from '@scaleflex/ui/core/popup';

/** Internal Dependencies */
import { SET_ERROR } from 'actions';
import { useStore } from 'hooks';

const defaultAnchorOrigin = {
  horizontal: 'center',
  vertical: 'bottom',
};

const ERROR_TO_ROBOT_STATUS = {
  error: 'sad',
  warning: 'worried',
};

const ErrorPopup = ({ anchorOrigin }) => {
  const { error = {}, dispatch } = useStore();

  if (!error.message) {
    return null;
  }

  const onClose = () => {
    dispatch({
      type: SET_ERROR,
      payload: {
        error: {},
      },
    });
  };

  return (
    <Popup
      anchorOrigin={anchorOrigin}
      autoHideDuration={error.duration ?? 5000}
      message={error.message}
      open={Boolean(error.message)}
      status={ERROR_TO_ROBOT_STATUS[error.status || 'error']}
      onClose={onClose}
    />
  );
};

ErrorPopup.defaultProps = {
  anchorOrigin: defaultAnchorOrigin,
};

ErrorPopup.propTypes = {
  anchorOrigin: PropTypes.instanceOf(Object),
};

export default ErrorPopup;
