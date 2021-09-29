/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const Blur = ({ color, ...props }) => (
  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" color={color} {...props}>
    <g clipPath="url(#clip0)">
      <path d="M12.8694 11.2955C12.8694 10.832 12.7049 10.176 12.3951 9.37712C12.0902 8.59081 11.6644 7.71507 11.1859 6.82917C10.2294 5.0581 9.08368 3.28535 8.33547 2.17222C8.17062 1.92697 7.82947 1.92697 7.66462 2.17222C6.91641 3.28535 5.77071 5.0581 4.81415 6.82917C4.33567 7.71507 3.90984 8.59081 3.60496 9.37712C3.29519 10.176 3.13069 10.832 3.13069 11.2955C3.13069 13.9848 5.31077 16.1648 8.00004 16.1648C10.6893 16.1648 12.8694 13.9848 12.8694 11.2955Z" stroke="currentColor" strokeWidth="1.1" />
      <path d="M11.1987 11.2652C11.1696 11.4355 11.128 11.6016 11.0749 11.7624C10.7265 12.8165 9.88119 13.6445 8.81638 13.9689C8.66747 14.0143 8.51427 14.0498 8.35754 14.0747" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="16" height="16" fill="white" transform="translate(0 0.714844)" />
      </clipPath>
    </defs>
  </svg>
);

Blur.defaultProps = {
  color: '#5D6D7E',
};

Blur.propTypes = {
  color: PropTypes.string,
};

export default Blur;
