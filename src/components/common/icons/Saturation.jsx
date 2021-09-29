/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const Saturation = ({ color, ...props }) => (
  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" color={color} {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M7.49623 2.63516C4.36299 2.89132 1.90005 5.51536 1.90005 8.71465C1.90005 11.9139 4.36299 14.538 7.49623 14.7941V2.63516ZM11.9639 13.3514C11.5891 13.6721 11.1749 13.9482 10.7297 14.1713V3.25798C11.1749 3.48114 11.5891 3.75719 11.9639 4.0779V13.3514ZM12.9639 12.2609C13.6791 11.2616 14.1 10.0373 14.1 8.71465C14.1 7.39202 13.6791 6.1677 12.9639 5.16836V12.2609ZM8.49623 14.7948C8.92117 14.7606 9.33382 14.6828 9.7297 14.566V2.86334C9.33382 2.7465 8.92117 2.66874 8.49623 2.63454V14.7948ZM15.2 8.71465C15.2 12.6911 11.9765 15.9146 8.00005 15.9146C4.0236 15.9146 0.800049 12.6911 0.800049 8.71465C0.800049 4.7382 4.0236 1.51465 8.00005 1.51465C11.9765 1.51465 15.2 4.7382 15.2 8.71465Z" fill="currentColor" />
  </svg>
);

Saturation.defaultProps = {
  color: '#5D6D7E',
};

Saturation.propTypes = {
  color: PropTypes.string,
};

export default Saturation;
