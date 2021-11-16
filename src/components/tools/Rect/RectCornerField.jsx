/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Label } from '@scaleflex/ui/core';

/** InternalDependencies */
import { StyledSpacedOptionFields } from 'components/common/AnnotationOptions/AnnotationOptions.styled';
import restrictNumber from 'utils/restrictNumber';
import Slider from 'components/common/Slider';

const MIN_VALUE = 0;
const MAX_VALUE = 200;

const RectCornerField = ({
  annotation: rect,
  updateAnnotation: updateRect,
}) => {
  const { cornerRadius } = rect;

  const updateCornerRadius = (newCornerRadius) => {
    updateRect({
      cornerRadius: restrictNumber(newCornerRadius, MIN_VALUE, MAX_VALUE),
    });
  };

  return (
    <StyledSpacedOptionFields>
      <Label>Corner Radius</Label>
      <Slider
        annotation="px"
        onChange={updateCornerRadius}
        value={cornerRadius}
        min={MIN_VALUE}
        max={MAX_VALUE}
      />
    </StyledSpacedOptionFields>
  );
};

RectCornerField.propTypes = {
  annotation: PropTypes.instanceOf(Object).isRequired,
  updateAnnotation: PropTypes.func.isRequired,
};

export default RectCornerField;
