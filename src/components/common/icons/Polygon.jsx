/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const Polygon = ({ color, ...props }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color={color}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.433 6.55559L8.00009 1.88184L1.56721 6.55559L4.02435 14.1179L11.9758 14.1179L14.433 6.55559ZM8.58787 1.07282C8.23738 0.818175 7.76279 0.818175 7.4123 1.07282L0.979422 5.74658C0.628935 6.00122 0.482276 6.45259 0.61615 6.86461L3.07329 14.4269C3.20717 14.8389 3.59112 15.1179 4.02435 15.1179H11.9758C12.409 15.1179 12.793 14.8389 12.9269 14.4269L15.384 6.86461C15.5179 6.45259 15.3712 6.00122 15.0207 5.74658L8.58787 1.07282Z"
      fill="currentColor"
    />
  </svg>
);

Polygon.defaultProps = {
  color: '#5D6D7E',
};

Polygon.propTypes = {
  color: PropTypes.string,
};

export default Polygon;
