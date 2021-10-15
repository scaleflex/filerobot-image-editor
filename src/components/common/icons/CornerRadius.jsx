/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const CornerRadius = ({ color, ...props }) => (
  <svg
    width="19"
    height="18"
    viewBox="0 0 19 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color={color}
    {...props}
  >
    <path
      d="M1.5 1H9.5V0H1.5C0.947715 0 0.5 0.447716 0.5 1V17C0.5 17.5523 0.947716 18 1.5 18H17.5C18.0523 18 18.5 17.5523 18.5 17V9H17.5V17H1.5V1Z"
      fill="currentColor"
    />
    <path
      d="M18.5 2.70031H17.5V2.00031C17.5 1.86287 17.4728 1.7343 17.4245 1.61778L18.3483 1.23473C18.446 1.47054 18.5 1.72912 18.5 2.00031V2.70031Z"
      fill="currentColor"
    />
    <path
      d="M10.2 0.000305176V1.00031H11.6V0.000305176H10.2Z"
      fill="currentColor"
    />
    <path
      d="M13 0.000305176V1.00031H14.4V0.000305176H13Z"
      fill="currentColor"
    />
    <path
      d="M15.8 0.000305176V1.00031H16.5C16.6374 1.00031 16.766 1.02747 16.8825 1.07579L17.2656 0.152066C17.0298 0.0542775 16.7712 0.000305176 16.5 0.000305176H15.8Z"
      fill="currentColor"
    />
    <path d="M18.5 4.10031H17.5V5.50031H18.5V4.10031Z" fill="currentColor" />
    <path d="M18.5 6.90031H17.5V8.30031H18.5V6.90031Z" fill="currentColor" />
  </svg>
);

CornerRadius.defaultProps = {
  color: '#5D6D7E',
};

CornerRadius.propTypes = {
  color: PropTypes.string,
};

export default CornerRadius;
