/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const Duplicate = ({ color, ...props }) => (
  <svg
    width="12"
    height="14"
    viewBox="0 0 12 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color={color}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.339844 11.111V1.04761C0.339844 0.495323 0.787558 0.0476074 1.33984 0.0476074H8.81823C9.37052 0.0476074 9.81823 0.495322 9.81823 1.04761V11.111C9.81823 11.6633 9.37052 12.111 8.81824 12.111H1.33984C0.787559 12.111 0.339844 11.6633 0.339844 11.111ZM1.33984 11.111V1.04761L8.81823 1.04761L8.81824 11.111L1.33984 11.111Z"
      fill="currentColor"
    />
    <path
      d="M11.66 3.97388C11.66 3.69774 11.4361 3.47388 11.16 3.47388C10.8838 3.47388 10.66 3.69774 10.66 3.97388V12.9523H3.40491C3.12876 12.9523 2.90491 13.1761 2.90491 13.4523C2.90491 13.7284 3.12876 13.9523 3.40491 13.9523H11.16C11.4361 13.9523 11.66 13.7284 11.66 13.4523V3.97388Z"
      fill="currentColor"
    />
  </svg>
);

Duplicate.defaultProps = {
  color: '#959DA8',
};

Duplicate.propTypes = {
  color: PropTypes.string,
};

export default Duplicate;
