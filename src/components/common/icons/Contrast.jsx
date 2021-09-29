/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const Contrast = ({ color, ...props }) => (
  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" color={color} {...props}>
    <circle cx="7.99999" cy="8.71465" r="6.7" stroke="currentColor" />
    <rect x="7.75" y="2.34131" width="0.5" height="12.6752" stroke="currentColor" strokeWidth="0.5" />
  </svg>
);

Contrast.defaultProps = {
  color: '#5D6D7E',
};

Contrast.propTypes = {
  color: PropTypes.string,
};

export default Contrast;
