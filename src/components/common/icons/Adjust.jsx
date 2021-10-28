/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const Adjust = ({ color, ...props }) => (
  <svg
    width="19"
    height="18"
    viewBox="0 0 19 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color={color}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.50012 0H1.5C0.947715 0 0.5 0.447716 0.5 1V5.0001H1.6V1.1H5.50012V0ZM5.50012 16.9H1.6V13.0001H0.5V17C0.5 17.5523 0.947716 18 1.5 18H5.50012V16.9ZM13.5001 18V16.9H17.4V13.0001H18.5V17C18.5 17.5523 18.0523 18 17.5 18H13.5001ZM13.5001 1.1V0H17.5C18.0523 0 18.5 0.447715 18.5 1V5.0001H17.4V1.1H13.5001Z"
      fill="currentColor"
    />
  </svg>
);

Adjust.defaultProps = {
  color: '#5D6D7E',
};

Adjust.propTypes = {
  color: PropTypes.string,
};

export default Adjust;
