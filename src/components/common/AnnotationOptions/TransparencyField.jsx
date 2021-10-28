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
const MAX_PERCENTANGE = 1;

const TransparencyField = ({ annotation, updateAnnotation }) => {
  const { opacity } = annotation;

  const changeOpacity = (slidedNewOpacity) => {
    updateAnnotation({
      opacity: restrictNumber(
        slidedNewOpacity.from / 100,
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
        isActive={opacity >= 0}
        onChange={changeOpacity}
        value={{ from: opacity * 100 }}
      />
    </StyledSpacedOptionFields>
  );
};

TransparencyField.propTypes = {
  annotation: PropTypes.instanceOf(Object).isRequired,
  updateAnnotation: PropTypes.func.isRequired,
};

export default TransparencyField;
