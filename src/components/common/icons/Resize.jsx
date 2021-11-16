/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const Resize = ({ color, ...props }) => (
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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.8028 7.06733C10.5887 7.28144 10.5887 7.62859 10.8028 7.84271C11.0169 8.05682 11.3641 8.05682 11.5782 7.84271L15.0904 4.33045L15.0904 6.59629C15.0904 6.90005 15.3367 7.14629 15.6404 7.14629C15.9442 7.14629 16.1904 6.90005 16.1904 6.59629L16.1904 2.9949C16.1904 2.69114 15.9442 2.4449 15.6404 2.4449L12.039 2.4449C11.7353 2.4449 11.489 2.69114 11.489 2.9949C11.489 3.29866 11.7353 3.5449 12.039 3.5449L14.3252 3.5449L10.8028 7.06733Z"
      fill="currentColor"
    />
    <rect
      x="1"
      y="0.5"
      width="17"
      height="17"
      stroke="currentColor"
      strokeDasharray="1.5 1.5"
    />
    <rect
      x="1.05"
      y="8.85774"
      width="8.59231"
      height="8.59231"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
  </svg>
);

Resize.defaultProps = {
  color: '#768184',
};

Resize.propTypes = {
  color: PropTypes.string,
};

export default Resize;
