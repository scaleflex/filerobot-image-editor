/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Label } from '@scaleflex/ui/core';

/** Internal Dependencies */
import restrictNumber from 'utils/restrictNumber';
import ColorPicker from 'components/common/ColorPicker';
import {
  StyledSpacedOptionFields,
  StyledSliderField,
} from './AnnotationOptions.styled';

const MIN_PERCENTANGE = 0;
const MAX_PERCENTANGE = 100;

const StrokeFields = ({ annotation, updateAnnotation }) => {
  const { stroke, strokeWidth } = annotation;

  const changeStrokeWidth = (slidedNewStrokeWidth) => {
    updateAnnotation({
      strokeWidth: restrictNumber(
        slidedNewStrokeWidth.from,
        MIN_PERCENTANGE,
        MAX_PERCENTANGE,
      ),
    });
  };

  const changeStrokeColor = (e) => {
    updateAnnotation({ stroke: e.target.value });
  };

  return (
    <StyledSpacedOptionFields>
      <Label>Stroke</Label>
      <StyledSliderField
        annotation="px"
        isActive={Boolean(strokeWidth)}
        onChange={changeStrokeWidth}
        value={{ from: strokeWidth }}
      />
      <ColorPicker value={stroke} onChange={changeStrokeColor} />
    </StyledSpacedOptionFields>
  );
};

StrokeFields.propTypes = {
  annotation: PropTypes.instanceOf(Object).isRequired,
  updateAnnotation: PropTypes.func.isRequired,
};

export default StrokeFields;
