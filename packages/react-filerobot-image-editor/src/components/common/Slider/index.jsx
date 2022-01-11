/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { StyledSlider } from './Slider.styled';

const Slider = ({ onChange, ...props }) => {
  return (
    <StyledSlider
      annotation=""
      onChange={(_e, val) => (onChange ? onChange(val) : undefined)}
      {...props}
    />
  );
};

Slider.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Slider;
