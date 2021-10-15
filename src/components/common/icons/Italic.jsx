/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const Italic = ({ color, ...props }) => (
  <svg
    width="6"
    height="14"
    viewBox="0 0 6 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color={color}
    {...props}
  >
    <path
      d="M2.6826 14H0.884521L3.31721 0H5.11529L2.6826 14Z"
      fill="currentColor"
    />
  </svg>
);

Italic.defaultProps = {
  color: '#5D6D7E',
};

Italic.propTypes = {
  color: PropTypes.string,
};

export default Italic;
