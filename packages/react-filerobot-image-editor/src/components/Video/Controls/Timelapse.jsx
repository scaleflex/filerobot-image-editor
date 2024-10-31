/** External Dependencies */
import PropTypes from 'prop-types';

/** Internal Dependencies */
import formatSecondsToDuration from 'utils/formatSecondsToDuration';
import Styled from './Controls.styled';

const TimeLapse = ({ trackProgress, duration }) => {
  const formattedProgress = formatSecondsToDuration(trackProgress);
  const formattedDuration = formatSecondsToDuration(duration);

  return (
    <Styled.TimeLapse>
      {`${formattedProgress} / ${formattedDuration}`}
    </Styled.TimeLapse>
  );
};

TimeLapse.propTypes = {
  trackProgress: PropTypes.number,
  duration: PropTypes.number,
};
export default TimeLapse;
