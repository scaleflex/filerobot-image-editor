/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const Remove = ({ color, ...props }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color={color}
    {...props}
  >
    <path
      d="M5 5.5C5 5.22386 5.22386 5 5.5 5C5.77614 5 6 5.22386 6 5.5L6 10.5C6 10.7761 5.77614 11 5.5 11C5.22386 11 5 10.7761 5 10.5L5 5.5Z"
      fill="currentColor"
    />
    <path
      d="M8.5 5C8.22386 5 8 5.22386 8 5.5L8 10.5C8 10.7761 8.22386 11 8.5 11C8.77614 11 9 10.7761 9 10.5V5.5C9 5.22386 8.77614 5 8.5 5Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 2V1C4 0.447715 4.44772 0 5 0H9C9.55228 0 10 0.447715 10 1V2H13.5C13.7761 2 14 2.22386 14 2.5C14 2.77614 13.7761 3 13.5 3H12.5V13C12.5 13.5523 12.0523 14 11.5 14H2.5C1.94772 14 1.5 13.5523 1.5 13V3L0.5 3C0.223857 3 0 2.77614 0 2.5C0 2.22386 0.223858 2 0.5 2H4ZM5 1H9V2H5V1ZM2.5 3L2.5 13H11.5V3H2.5Z"
      fill="currentColor"
    />
  </svg>
);

Remove.defaultProps = {
  color: '#959DA8',
};

Remove.propTypes = {
  color: PropTypes.string,
};

export default Remove;
