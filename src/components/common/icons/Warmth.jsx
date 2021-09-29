/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const Warmth = ({ color, ...props }) => (
  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" color={color} {...props}>
    <rect x="13.4349" y="0.934844" width="0.44" height="2.36" rx="0.22" transform="rotate(90 13.4349 0.934844)" fill="#C4C4C4" stroke="currentColor" strokeWidth="0.44" />
    <rect x="13.4349" y="3.17459" width="0.44" height="2.36" rx="0.22" transform="rotate(90 13.4349 3.17459)" fill="#C4C4C4" stroke="currentColor" strokeWidth="0.44" />
    <rect x="13.4349" y="5.41434" width="0.44" height="2.36" rx="0.22" transform="rotate(90 13.4349 5.41434)" fill="#C4C4C4" stroke="currentColor" strokeWidth="0.44" />
    <path d="M7.58298 12.9147C7.58298 13.5223 7.0905 14.0147 6.48298 14.0147C5.87547 14.0147 5.38298 13.5223 5.38298 12.9147C5.38298 12.3072 5.87547 11.8147 6.48298 11.8147C7.0905 11.8147 7.58298 12.3072 7.58298 12.9147Z" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
    <path d="M6.08301 4.07184C6.08301 3.82883 6.28 3.63184 6.52301 3.63184C6.76601 3.63184 6.96301 3.82883 6.96301 4.07184V11.8702H6.08301V4.07184Z" fill="currentColor" />
    <path d="M7.68992 1.26484C7.93845 1.26484 8.13992 1.46632 8.13992 1.71484V8.52487C8.13992 9.06794 8.4255 9.52421 8.78228 9.82239C9.57082 10.4814 10.071 11.4705 10.071 12.5769C10.071 14.5585 8.46458 16.1648 6.48302 16.1648C4.50146 16.1648 2.89509 14.5585 2.89509 12.5769C2.89509 11.4705 3.39523 10.4814 4.18377 9.82239C4.54054 9.52421 4.82613 9.06794 4.82613 8.52487V1.71484C4.82613 1.46632 5.0276 1.26484 5.27613 1.26484H7.68992Z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

Warmth.defaultProps = {
  color: '#5D6D7E',
};

Warmth.propTypes = {
  color: PropTypes.string,
};

export default Warmth;
