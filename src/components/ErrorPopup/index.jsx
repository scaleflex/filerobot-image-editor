/** External Dependencies */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Popup } from '@scaleflex/ui/core';

/** Internal Dependencies */
import AppContext from 'context';
import { SET_ERROR } from 'actions';

const defaultAnchorOrigin = {
  horizontal: 'center',
  vertical: 'bottom',
};

// TODO: change error to feedback and support both success & neutral also.
const ERROR_TO_ROBOT_STATUS = {
  error: 'sad',
  warning: 'worried',
};

const ErrorPopup = ({ anchorOrigin }) => {
  const { error = {}, dispatch } = useContext(AppContext);

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
