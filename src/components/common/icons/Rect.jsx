/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const Rect = ({ color, ...props }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" color={color} {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M1.68005 1.68005V14.32H14.32V1.68005H1.68005ZM1.60005 0.800049C1.15822 0.800049 0.800049 1.15822 0.800049 1.60005V14.4C0.800049 14.8419 1.15822 15.2 1.60005 15.2H14.4C14.8419 15.2 15.2 14.8419 15.2 14.4V1.60005C15.2 1.15822 14.8419 0.800049 14.4 0.800049H1.60005Z" fill="currentColor" />
  </svg>
);

Rect.defaultProps = {
  color: '#5D6D7E',
};

Rect.propTypes = {
  color: PropTypes.string,
};

export default Rect;
