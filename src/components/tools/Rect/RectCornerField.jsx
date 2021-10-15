/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Label } from '@scaleflex/ui/core';

/** InternalDependencies */
import {
  StyledSliderField,
  StyledSpacedOptionFields,
} from 'components/common/AnnotationOptions/AnnotationOptions.styled';
import restrictNumber from 'utils/restrictNumber';

const MIN_VALUE = 0;
const MAX_VALUE = 100;

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
      <StyledSliderField
        annotation="px"
        isActive={Boolean(cornerRadius)}
        onChange={updateCornerRadius}
        value={{ from: cornerRadius }}
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
