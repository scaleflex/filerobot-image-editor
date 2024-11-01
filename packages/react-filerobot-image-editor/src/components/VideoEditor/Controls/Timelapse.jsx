/** External Dependencies */
import PropTypes from 'prop-types';

/** Internal Dependencies */
import formatSecondsToDuration from 'utils/formatSecondsToDuration';
import { StyledTimeLapse } from './Controls.styled';

const TimeLapse = ({ trackProgress, duration }) => {
  const formattedProgress = formatSecondsToDuration(trackProgress);
  const formattedDuration = formatSecondsToDuration(duration);

  return (
    <StyledTimeLapse className="FIE_video-controls-time-lapse">
      {`${formattedProgress} / ${formattedDuration}`}
    </StyledTimeLapse>
  );
};

TimeLapse.propTypes = {
  trackProgress: PropTypes.number,
  duration: PropTypes.number,
};
export default TimeLapse;
