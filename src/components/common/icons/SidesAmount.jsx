/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const SidesAmount = ({ color, ...props }) => (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color={color}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.70313 12.3867H10.834L10.4121 14.7891H11.4844L11.9063 12.3867H13.3945V11.3789H12.082L12.375 9.71484H13.8398V8.69531H12.5566L12.9844 6.25781H11.9121L11.4844 8.69531H10.3477L10.7754 6.25781H9.70899L9.28125 8.69531H7.74024V9.71484H9.09961L8.80664 11.3789H7.30078V12.3867H8.63086L8.20899 14.7891H9.28125L9.70313 12.3867ZM11.0098 11.3789H9.87891L10.166 9.71484H11.3027L11.0098 11.3789Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.91793 0.728459C10.2684 0.473815 10.743 0.473814 11.0935 0.728458L19.8921 7.12103C20.2426 7.37567 20.3893 7.82704 20.2554 8.23906L16.8946 18.5825C16.7607 18.9945 16.3768 19.2734 15.9436 19.2734H5.06787C4.63465 19.2734 4.25069 18.9945 4.11681 18.5825L0.756043 8.23906C0.622169 7.82704 0.768827 7.37567 1.11931 7.12103L9.91793 0.728459ZM10.5057 1.53748L19.3043 7.93004L15.9436 18.2734H5.06787L1.7071 7.93004L10.5057 1.53748Z"
      fill="currentColor"
    />
  </svg>
);

SidesAmount.defaultProps = {
  color: '#5D6D7E',
};

SidesAmount.propTypes = {
  color: PropTypes.string,
};

export default SidesAmount;
