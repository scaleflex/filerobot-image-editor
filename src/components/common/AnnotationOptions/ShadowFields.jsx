/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Label } from '@scaleflex/ui/core';

/** Internal Dependencies */
import restrictNumber from 'utils/restrictNumber';
import ColorPicker from 'components/common/ColorPicker';
import {
  StyledSliderField,
  StyledBoldLabel,
  StyledTwoColumnsContainer,
  StyledColumn,
  StyledSpacedOptionFields,
} from './AnnotationOptions.styled';

const MIN_VAL = 0;
const MAX_VAL = 100;

const ShadowFields = ({ annotation, updateAnnotation }) => {
  const {
    shadowOffsetX,
    shadowOffsetY,
    shadowBlur,
    shadowColor,
    shadowOpacity,
  } = annotation;

  const changeSliderValue = (property, newValue) => {
    updateAnnotation({
      [property]: restrictNumber(newValue, MIN_VAL, MAX_VAL),
    });
  };

  const changeShadowColor = (e) => {
    updateAnnotation({ shadowColor: e.target.value });
  };

  return (
    <StyledSpacedOptionFields>
      <StyledBoldLabel>Shadow</StyledBoldLabel>
      <StyledTwoColumnsContainer>
        <StyledColumn>
          <Label>Horizontal</Label>
          <StyledSliderField
            annotation="px"
            isActive={Boolean(shadowOffsetX)}
            onChange={(val) => changeSliderValue('shadowOffsetX', val.from)}
            value={{ from: shadowOffsetX }}
          />
        </StyledColumn>
        <StyledColumn>
          <Label>Vertical</Label>
          <StyledSliderField
            annotation="px"
            isActive={Boolean(shadowOffsetY)}
            onChange={(val) => changeSliderValue('shadowOffsetY', val.from)}
            value={{ from: shadowOffsetY }}
          />
        </StyledColumn>
      </StyledTwoColumnsContainer>
      <StyledTwoColumnsContainer>
        <StyledColumn>
          <Label>Blur</Label>
          <StyledSliderField
            annotation="%"
            isActive={Boolean(shadowBlur)}
            onChange={(val) => changeSliderValue('shadowBlur', val.from)}
            value={{ from: shadowBlur }}
          />
        </StyledColumn>
        <StyledColumn>
          <Label>Transparency</Label>
          <StyledSliderField
            annotation="%"
            isActive={Boolean(shadowOpacity)}
            onChange={(val) =>
              changeSliderValue('shadowOpacity', val.from / MAX_VAL)
            }
            value={{ from: shadowOpacity }}
          />
        </StyledColumn>
      </StyledTwoColumnsContainer>
      <ColorPicker value={shadowColor} onChange={changeShadowColor} />
    </StyledSpacedOptionFields>
  );
};

ShadowFields.propTypes = {
  annotation: PropTypes.instanceOf(Object).isRequired,
  updateAnnotation: PropTypes.func.isRequired,
};

export default ShadowFields;
