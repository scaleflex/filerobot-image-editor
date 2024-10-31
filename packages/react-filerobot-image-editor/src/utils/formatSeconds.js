/**
 * Takes an Integer value of seconds (e.g. 83) and converts it into a human-readable formatted string (e.g. '1:10:23').
 *
 * @param {Integer} seconds
 * @returns {string} the formatted seconds (e.g. '1:10:23' for 1 hour, 10 minutes and 23 seconds)
 *
 */
export default function formatSeconds(seconds, showHours) {
  if (!seconds) return;

  const formattedHours = Math.floor(seconds / 3600);
  const formattedMinutes = Math.floor((seconds % 3600) / 60);
  const formattedSeconds = Math.floor(seconds % 60);

  const returnedHours =
    formattedHours || showHours
      ? `${String(formattedHours).padStart(2, '0')}:`
      : '';
  const returnedMinutes = String(formattedMinutes).padStart(2, 0);
  const returnedSeconds = String(formattedSeconds).padStart(2, 0);

  return `${returnedHours}${returnedMinutes}:${returnedSeconds}`;
}
