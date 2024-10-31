import formatSeconds from './formatSeconds';

const formatSecondsToDuration = (seconds, showHours) => {
  if (!seconds || !Number.isFinite(seconds))
    return showHours ? '00:00:00' : '00:00';

  return formatSeconds(seconds, showHours);
};

export default formatSecondsToDuration;
