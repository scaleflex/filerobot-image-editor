/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const Custom = ({ color, ...props }) => (
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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.5 0.5H1.5V1.25H1.25V1.5H0.5V0.5ZM0.5 14.5V15.5H1.5V14.75H1.25V14.5H0.5ZM14.5 15.5H15.5V14.5H14.75V14.75H14.5V15.5ZM15.5 1.5V0.5H14.5V1.25H14.75V1.5H15.5ZM2.75 0.5V1.5H4.25V0.5H2.75ZM5.75 0.5V1.5H7.25V0.5H5.75ZM8.75 0.5V1.5H10.25V0.5H8.75ZM11.75 0.5V1.5H13.25V0.5H11.75ZM15.5 2.75H14.5V4.25H15.5V2.75ZM15.5 5.75H14.5V7.25H15.5V5.75ZM15.5 8.75H14.5V10.25H15.5V8.75ZM15.5 11.75H14.5V13.25H15.5V11.75ZM13.25 15.5V14.5H11.75V15.5H13.25ZM10.25 15.5V14.5H8.75V15.5H10.25ZM7.25 15.5V14.5H5.75V15.5H7.25ZM4.25 15.5V14.5H2.75V15.5H4.25ZM0.5 13.25H1.5V11.75H0.5V13.25ZM0.5 10.25H1.5V8.75H0.5V10.25ZM0.5 7.25H1.5V5.75H0.5V7.25ZM0.5 4.25H1.5V2.75H0.5V4.25Z"
      fill="currentColor"
    />
  </svg>
);

Custom.defaultProps = {
  color: '#5D6D7E',
};

Custom.propTypes = {
  color: PropTypes.string,
};

export default Custom;
