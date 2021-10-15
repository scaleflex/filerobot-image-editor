/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const LeftAlignment = ({ color, ...props }) => (
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
      d="M0 0.757812C0 0.48167 0.223858 0.257812 0.5 0.257812H11.5C11.7761 0.257812 12 0.48167 12 0.757812C12 1.03395 11.7761 1.25781 11.5 1.25781H0.5C0.223858 1.25781 0 1.03395 0 0.757812Z"
      fill="currentColor"
    />
    <path
      d="M0 5.75781C0 5.48167 0.223858 5.25781 0.5 5.25781H17.5C17.7761 5.25781 18 5.48167 18 5.75781C18 6.03396 17.7761 6.25781 17.5 6.25781H0.5C0.223858 6.25781 0 6.03396 0 5.75781Z"
      fill="currentColor"
    />
    <path
      d="M0.5 10.2578C0.223858 10.2578 0 10.4817 0 10.7578C0 11.034 0.223858 11.2578 0.5 11.2578H11.5C11.7761 11.2578 12 11.034 12 10.7578C12 10.4817 11.7761 10.2578 11.5 10.2578H0.5Z"
      fill="currentColor"
    />
  </svg>
);

LeftAlignment.defaultProps = {
  color: '#959DA8',
};

LeftAlignment.propTypes = {
  color: PropTypes.string,
};

export default LeftAlignment;
