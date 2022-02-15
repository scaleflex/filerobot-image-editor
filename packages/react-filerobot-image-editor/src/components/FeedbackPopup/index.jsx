/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import Popup from '@scaleflex/ui/core/popup';

/** Internal Dependencies */
import { SET_FEEDBACK } from 'actions';
import { useStore } from 'hooks';
import { FEEDBACK_STATUSES } from 'utils/constants';

const defaultAnchorOrigin = {
  horizontal: 'center',
  vertical: 'bottom',
};

const ERROR_TO_ROBOT_STATUS = {
  [FEEDBACK_STATUSES.ERROR]: 'sad',
  [FEEDBACK_STATUSES.WARNING]: 'worried',
};

const FeedbackPopup = ({ anchorOrigin }) => {
  const { feedback = {}, dispatch } = useStore();

  if (!feedback.message) {
    return null;
  }

  const onClose = () => {
    dispatch({
      type: SET_FEEDBACK,
      payload: {
        feedback: {},
      },
    });
  };

  return (
    <Popup
      className="FIE_feedback-robot"
      anchorOrigin={anchorOrigin}
      autoHideDuration={feedback.duration ?? 5000}
      message={feedback.message}
      open={Boolean(feedback.message)}
      status={ERROR_TO_ROBOT_STATUS[feedback.status || FEEDBACK_STATUSES.ERROR]}
      onClose={onClose}
    />
  );
};

FeedbackPopup.defaultProps = {
  anchorOrigin: defaultAnchorOrigin,
};

FeedbackPopup.propTypes = {
  anchorOrigin: PropTypes.instanceOf(Object),
};

export default FeedbackPopup;
