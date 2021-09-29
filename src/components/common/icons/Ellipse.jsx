/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const Ellipse = ({ color, ...props }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" color={color} {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M8 15.1201C11.9323 15.1201 15.1201 11.9323 15.1201 8C15.1201 4.06769 11.9323 0.879916 8 0.879916C4.06769 0.879916 0.879916 4.06769 0.879916 8C0.879916 11.9323 4.06769 15.1201 8 15.1201ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z" fill="currentColor" />
  </svg>
);

Ellipse.defaultProps = {
  color: '#5D6D7E',
};

Ellipse.propTypes = {
  color: PropTypes.string,
};

export default Ellipse;
