/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Label } from '@scaleflex/ui/core';

/** Internal Dependencies */
import restrictNumber from 'utils/restrictNumber';
import {
  StyledSpacedOptionFields,
  StyledSliderField,
} from './AnnotationOptions.styled';

const MIN_PERCENTANGE = 0;
const MAX_PERCENTANGE = 100;

const TransparencyField = ({ annotation, updateAnnotation }) => {
  const { opacity } = annotation;

  const changeOpacity = (slidedNewOpacity) => {
    updateAnnotation({
      opacity: restrictNumber(
        slidedNewOpacity.from / MAX_PERCENTANGE,
        MIN_PERCENTANGE,
        MAX_PERCENTANGE,
      ),
    });
  };

  return (
    <StyledSpacedOptionFields>
      <Label>Transparency</Label>
      <StyledSliderField
        annotation="%"
        isActive={Boolean(opacity)}
        onChange={changeOpacity}
        value={{ from: opacity }}
      />
    </StyledSpacedOptionFields>
  );
};

TransparencyField.propTypes = {
  annotation: PropTypes.instanceOf(Object).isRequired,
  updateAnnotation: PropTypes.func.isRequired,
};

export default TransparencyField;
