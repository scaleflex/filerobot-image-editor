/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import restrictNumber from 'utils/restrictNumber';
import { Label } from '@scaleflex/ui/core';
import {
  StyledSpacedOptionFields,
  StyledIconLabel,
  StyledOptionPopupContent,
} from './AnnotationOptions.styled';
import Slider from '../Slider';

const MIN_PERCENTANGE = 0;
const MAX_PERCENTANGE = 1;

const OpacityField = ({ annotation, updateAnnotation, t }) => {
  const { opacity } = annotation;
  const opacityValue = Math.round(opacity * 100);

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
    <StyledOptionPopupContent disablePadding>
      <Label>{t('transparency')}</Label>
      <StyledSpacedOptionFields>
        <Slider
          annotation="%"
          onChange={changeOpacity}
          value={opacityValue}
          noMargin
        />
        <StyledIconLabel>{`${opacityValue}%`}</StyledIconLabel>
      </StyledSpacedOptionFields>
    </StyledOptionPopupContent>
  );
};

OpacityField.propTypes = {
  annotation: PropTypes.instanceOf(Object).isRequired,
  t: PropTypes.func.isRequired,
  updateAnnotation: PropTypes.func.isRequired,
};

export default OpacityField;
