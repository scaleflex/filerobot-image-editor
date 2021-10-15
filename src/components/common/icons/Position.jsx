/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const Position = ({ color, ...props }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color={color}
    {...props}
  >
    <path
      d="M3.50003 3.49951H4.50003V4.18701H4.18753V4.49951H3.50003V3.49951Z"
      fill="currentColor"
    />
    <path
      d="M3.50003 13.4995V14.4995H4.50003V13.812H4.18753V13.4995H3.50003Z"
      fill="currentColor"
    />
    <path
      d="M13.5 14.4995H14.5V13.4995H13.8125V13.812H13.5V14.4995Z"
      fill="currentColor"
    />
    <path
      d="M14.5 4.49951V3.49951H13.5V4.18701H13.8125V4.49951H14.5Z"
      fill="currentColor"
    />
    <path
      d="M5.56253 3.49951V4.49951H6.93753V3.49951H5.56253Z"
      fill="currentColor"
    />
    <path
      d="M8.31253 3.49951V4.49951H9.68753V3.49951H8.31253Z"
      fill="currentColor"
    />
    <path
      d="M11.0625 3.49951V4.49951H12.4375V3.49951H11.0625Z"
      fill="currentColor"
    />
    <path d="M14.5 5.56201H13.5V6.93701H14.5V5.56201Z" fill="currentColor" />
    <path d="M14.5 8.31201H13.5V9.68701H14.5V8.31201Z" fill="currentColor" />
    <path d="M14.5 11.062H13.5V12.437H14.5V11.062Z" fill="currentColor" />
    <path
      d="M12.4375 14.4995V13.4995H11.0625V14.4995H12.4375Z"
      fill="currentColor"
    />
    <path
      d="M9.68753 14.4995V13.4995H8.31253V14.4995H9.68753Z"
      fill="currentColor"
    />
    <path
      d="M6.93753 14.4995V13.4995H5.56253V14.4995H6.93753Z"
      fill="currentColor"
    />
    <path
      d="M3.50003 12.437H4.50003V11.062H3.50003V12.437Z"
      fill="currentColor"
    />
    <path
      d="M3.50003 9.68701H4.50003V8.31201H3.50003V9.68701Z"
      fill="currentColor"
    />
    <path
      d="M3.50003 6.93701H4.50003V5.56201H3.50003V6.93701Z"
      fill="currentColor"
    />
    <path
      d="M9.00006 10.4999C9.82849 10.4999 10.5001 9.82831 10.5001 8.99988C10.5001 8.17145 9.82849 7.49988 9.00006 7.49988C8.17163 7.49988 7.50006 8.17145 7.50006 8.99988C7.50006 9.82831 8.17163 10.4999 9.00006 10.4999Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 0C0.447715 0 0 0.447716 0 1V17C0 17.5523 0.447716 18 1 18H17C17.5523 18 18 17.5523 18 17V1C18 0.447715 17.5523 0 17 0H1ZM17 1H1V17H17V1Z"
      fill="currentColor"
    />
  </svg>
);

Position.defaultProps = {
  color: '#5D6D7E',
};

Position.propTypes = {
  color: PropTypes.string,
};

export default Position;
