/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import restrictNumber from 'utils/restrictNumber';
import { StyledSpacedOptionFields } from './AnnotationOptions.styled';
import Slider from '../Slider';

const MIN_PERCENTANGE = 0;
const MAX_PERCENTANGE = 1;

const OpacityField = ({ annotation, updateAnnotation }) => {
  const { opacity } = annotation;

  const changeOpacity = (newOpactiy) => {
    updateAnnotation({
      opacity: restrictNumber(
        newOpactiy / 100,
        MIN_PERCENTANGE,
        MAX_PERCENTANGE,
      ),
    });
  };

  return (
    <StyledSpacedOptionFields>
      <Slider
        annotation="%"
        onChange={changeOpacity}
        value={Math.round(opacity * 100)}
        noMargin
      />
    </StyledSpacedOptionFields>
  );
};

OpacityField.propTypes = {
  annotation: PropTypes.instanceOf(Object).isRequired,
  updateAnnotation: PropTypes.func.isRequired,
};

export default OpacityField;
