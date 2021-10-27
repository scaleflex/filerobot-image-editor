/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const Landscape = ({ color, ...props }) => (
  <svg
    width="16"
    height="12"
    viewBox="0 0 16 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color={color}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 1.49997V10.5H15V1.49997H1ZM0.8 0.499969C0.358172 0.499969 0 0.851746 0 1.28568V10.7143C0 11.1482 0.358172 11.5 0.8 11.5H15.2C15.6418 11.5 16 11.1482 16 10.7143V1.28568C16 0.851746 15.6418 0.499969 15.2 0.499969H0.8Z"
      fill="currentColor"
    />
  </svg>
);

Landscape.defaultProps = {
  color: '#5D6D7E',
};

Landscape.propTypes = {
  color: PropTypes.string,
};

export default Landscape;
