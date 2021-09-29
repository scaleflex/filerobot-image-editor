/** External Dependencies */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { GoBack } from '@scaleflex/icons';
import { IconButton } from '@scaleflex/ui/core';

/** Internal Dependencies */
import { TOGGLE_SUB_TAB_SELECTION, TOGGLE_TAB_SELECTION } from 'actions';
import { memoAndMapContextToProps } from 'context';

const GoBackButton = ({ tab, subTab, dispatch }) => {
  const goBack = useCallback(() => {
    if (subTab || tab) {
      dispatch({
        type: [subTab ? TOGGLE_SUB_TAB_SELECTION : TOGGLE_TAB_SELECTION],
        payload: {
          item: null,
        },
      });
    }
  }, [tab, subTab]);

  return (
    <IconButton
      color="link"
      size="sm"
      onClick={goBack}
    >
      <GoBack />
    </IconButton>
  );
};

GoBackButton.defaultProps = {
  tab: null,
  subTab: null,
};

GoBackButton.propTypes = {
  tab: PropTypes.instanceOf(Object),
  subTab: PropTypes.instanceOf(Object),
  dispatch: PropTypes.func.isRequired,
};

export default memoAndMapContextToProps(GoBackButton);
