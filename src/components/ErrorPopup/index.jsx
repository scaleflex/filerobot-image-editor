/** External Dependencies */
import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { Popup } from '@scaleflex/ui/core';

/** Internal Dependencies */
import AppContext from 'context';
import { SET_ERROR } from 'actions';

const defaultAnchorOrigin = {
  horizontal: 'center',
  vertical: 'bottom',
};

const ErrorPopup = ({ anchorOrigin }) => {
  const { error = '', dispatch } = useContext(AppContext);

  const onClose = useCallback(() => {
    dispatch({
      type: SET_ERROR,
      payload: {
        error: '',
      },
    });
  }, []);

  return (
    <Popup
      anchorOrigin={anchorOrigin}
      autoHideDuration={5000}
      message={error}
      open={Boolean(error)}
      status="sad"
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
