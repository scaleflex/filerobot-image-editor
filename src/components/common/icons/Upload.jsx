/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const Upload = ({ color, ...props }) => (
  <svg
    width="11"
    height="14"
    viewBox="0 0 11 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color={color}
    {...props}
  >
    <path
      d="M6.11022 0.774687C5.82746 0.497641 5.37505 0.497629 5.09228 0.774659L1.778 4.02162C1.49109 4.30271 1.48636 4.76317 1.76745 5.05009C2.04854 5.337 2.509 5.34173 2.79592 5.06064L4.87396 3.0248V10.0214C4.87396 10.4231 5.19957 10.7487 5.60123 10.7487C6.0029 10.7487 6.32851 10.4231 6.32851 10.0214V3.02493L8.40617 5.06061C8.69307 5.34172 9.15353 5.33702 9.43464 5.05011C9.71574 4.76321 9.71104 4.30275 9.42414 4.02165L6.11022 0.774687Z"
      fill="currentColor"
    />
    <path
      d="M1.3733 11.9774C0.971639 11.9774 0.646028 12.303 0.646028 12.7047C0.646028 13.1063 0.971639 13.432 1.3733 13.432H9.80966C10.2113 13.432 10.5369 13.1063 10.5369 12.7047C10.5369 12.303 10.2113 11.9774 9.80966 11.9774H1.3733Z"
      fill="currentColor"
    />
  </svg>
);

Upload.defaultProps = {
  color: '#5D6D7E',
};

Upload.propTypes = {
  color: PropTypes.string,
};

export default Upload;
