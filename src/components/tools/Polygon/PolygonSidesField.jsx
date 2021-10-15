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

const MIN_VALUE = 3;
const MAX_VALUE = 25;

const PolygonSidesField = ({
  annotation: polygon,
  updateAnnotation: updatePolygon,
}) => {
  const { sides } = polygon;

  const updateSidesNumber = (newSidesNumber) => {
    updatePolygon({
      sides: restrictNumber(newSidesNumber.from, MIN_VALUE, MAX_VALUE),
    });
  };

  return (
    <StyledSpacedOptionFields>
      <Label>Sides</Label>
      <StyledSliderField
        annotation=""
        isActive={Boolean(sides)}
        onChange={updateSidesNumber}
        value={{ from: sides }}
        min={MIN_VALUE}
        max={MAX_VALUE}
      />
    </StyledSpacedOptionFields>
  );
};

PolygonSidesField.propTypes = {
  annotation: PropTypes.instanceOf(Object).isRequired,
  updateAnnotation: PropTypes.func.isRequired,
};

export default PolygonSidesField;
