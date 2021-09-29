/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const Stroke = ({ color, ...props }) => (
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" color={color} {...props}>
    <mask id="path-1-inside-1" fill="white">
      <rect x="3.5" y="3.75293" width="17" height="17" rx="1" />
    </mask>
    <rect x="3.5" y="3.75293" width="17" height="17" rx="1" stroke="currentColor" strokeWidth="2.2" mask="url(#path-1-inside-1)" />
    <mask id="path-2-inside-2" fill="white">
      <rect x="1" y="1.25293" width="22" height="22" rx="1" />
    </mask>
    <rect x="1" y="1.25293" width="22" height="22" rx="1" stroke="currentColor" strokeWidth="2.2" mask="url(#path-2-inside-2)" />
  </svg>
);

Stroke.defaultProps = {
  color: '#5D6D7E',
};

Stroke.propTypes = {
  color: PropTypes.string,
};

export default Stroke;
