/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const Union = ({ color, ...props }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" color={color} {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M6.00012 0.75293C5.81786 0.75293 5.67012 0.900676 5.67012 1.08293V1.65293H0.6C0.268629 1.65293 0 1.92156 0 2.25293V10.0529C0 10.3843 0.268629 10.6529 0.6 10.6529H5.67012V11.2229C5.67012 11.4052 5.81786 11.5529 6.00012 11.5529C6.18237 11.5529 6.33012 11.4052 6.33012 11.2229V10.6529H11.4C11.7314 10.6529 12 10.3843 12 10.0529V2.25293C12 1.92156 11.7314 1.65293 11.4 1.65293H6.33012V1.08293C6.33012 0.900676 6.18237 0.75293 6.00012 0.75293ZM5.67012 2.31293H0.66V9.99293H5.67012V2.31293ZM6.33012 9.99293V2.31293H11.34V9.99293H6.33012Z" fill="currentColor" />
  </svg>
);

Union.defaultProps = {
  color: '#5D6D7E',
};

Union.propTypes = {
  color: PropTypes.string,
};

export default Union;
