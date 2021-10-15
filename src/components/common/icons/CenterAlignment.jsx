/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const CenterAlignment = ({ color, ...props }) => (
  <svg
    width="18"
    height="12"
    viewBox="0 0 18 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color={color}
    {...props}
  >
    <path
      d="M15 1C15 0.723858 14.7761 0.5 14.5 0.5H3.5C3.22386 0.5 3 0.723858 3 1C3 1.27614 3.22386 1.5 3.5 1.5H14.5C14.7761 1.5 15 1.27614 15 1Z"
      fill="currentColor"
    />
    <path
      d="M18 6C18 5.72386 17.7761 5.5 17.5 5.5H0.5C0.223858 5.5 0 5.72386 0 6C0 6.27614 0.223858 6.5 0.5 6.5H17.5C17.7761 6.5 18 6.27614 18 6Z"
      fill="currentColor"
    />
    <path
      d="M14.5 10.5C14.7761 10.5 15 10.7239 15 11C15 11.2761 14.7761 11.5 14.5 11.5H3.5C3.22386 11.5 3 11.2761 3 11C3 10.7239 3.22386 10.5 3.5 10.5H14.5Z"
      fill="currentColor"
    />
  </svg>
);

CenterAlignment.defaultProps = {
  color: '#5D6D7E',
};

CenterAlignment.propTypes = {
  color: PropTypes.string,
};

export default CenterAlignment;
