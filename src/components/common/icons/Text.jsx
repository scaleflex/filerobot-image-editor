/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const Text = ({ color, ...props }) => (
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
      d="M2 4.8439V2.40002H13.84V4.84387H12.7982V4.43562C12.7982 3.84578 12.319 3.36673 11.7293 3.36673H8.67505V11.1851C8.67505 11.9135 9.26682 12.5051 9.99504 12.5051H10.3398V13.4565H5.51778V12.5051H5.86258C6.59088 12.5051 7.18258 11.9135 7.18258 11.1851V3.36675H4.11075C3.52092 3.36675 3.04182 3.84581 3.04182 4.43565V4.8439H2Z"
      fill="currentColor"
    />
  </svg>
);

Text.defaultProps = {
  color: '#5D6D7E',
};

Text.propTypes = {
  color: PropTypes.string,
};

export default Text;
