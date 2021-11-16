/** External Dependencies */
import React, { useState } from 'react';

/** Internal Dependencies */
import { StyledSlider } from './Slider.styled';

const Slider = (props) => {
  const [isSliding, setIsSliding] = useState(false);

  const enableIsSliding = () => {
    setIsSliding(true);
  };

  const disableIsSliding = () => {
    setIsSliding(false);
  };

  return (
    <StyledSlider
      showAnntotaionTooltip={isSliding}
      onDragStart={enableIsSliding}
      onDragEnd={disableIsSliding}
      {...props}
    />
  );
};

export default Slider;
