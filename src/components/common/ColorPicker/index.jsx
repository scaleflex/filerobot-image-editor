/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const ColorPicker = ({ onChange, value, ...rest }) => {
  return <input type="color" value={value} onChange={onChange} {...rest} />;
};

ColorPicker.defaultProps = {
  value: '',
};

ColorPicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default ColorPicker;
