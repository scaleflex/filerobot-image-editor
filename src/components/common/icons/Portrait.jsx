/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const Portrait = ({ color, ...props }) => (
  <svg
    width="12"
    height="16"
    viewBox="0 0 12 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color={color}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.5 15L10.5 1L1.5 1L1.5 15H10.5ZM11.5 1C11.5 0.447716 11.0523 0 10.5 0H1.5C0.947716 0 0.5 0.447715 0.5 1V15C0.5 15.5523 0.947715 16 1.5 16H10.5C11.0523 16 11.5 15.5523 11.5 15L11.5 1Z"
      fill="currentColor"
    />
  </svg>
);

Portrait.defaultProps = {
  color: '#5D6D7E',
};

Portrait.propTypes = {
  color: PropTypes.string,
};

export default Portrait;
