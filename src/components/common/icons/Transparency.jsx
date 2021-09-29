/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const Transparency = ({ color, ...props }) => (
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" color={color} {...props}>
    <rect x="2" y="2.25293" width="4" height="4" fill="currentColor" />
    <rect x="2" y="10.2529" width="4" height="4" fill="currentColor" />
    <rect x="2" y="18.2529" width="4" height="4" fill="currentColor" />
    <rect x="10" y="2.25293" width="4" height="4" fill="currentColor" />
    <rect x="10" y="10.2529" width="4" height="4" fill="currentColor" />
    <rect x="6" y="6.25293" width="4" height="4" fill="currentColor" />
    <rect x="6" y="14.2529" width="4" height="4" fill="currentColor" />
    <rect x="10" y="18.2529" width="4" height="4" fill="currentColor" />
    <rect x="18" y="2.25293" width="4" height="4" fill="currentColor" />
    <rect x="18" y="10.2529" width="4" height="4" fill="currentColor" />
    <rect x="14" y="6.25293" width="4" height="4" fill="currentColor" />
    <rect x="14" y="14.2529" width="4" height="4" fill="currentColor" />
    <rect x="18" y="18.2529" width="4" height="4" fill="currentColor" />
  </svg>
);

Transparency.defaultProps = {
  color: '#5D6D7E',
};

Transparency.propTypes = {
  color: PropTypes.string,
};

export default Transparency;
