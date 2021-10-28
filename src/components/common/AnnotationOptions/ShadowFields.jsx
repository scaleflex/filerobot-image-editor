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

const ShadowFields = ({ annotation, updateAnnotation }) => {
  const {
    shadowOffsetX,
    shadowOffsetY,
    shadowBlur,
    shadowColor,
    shadowOpacity,
  } = annotation;

  const changeSliderValue = (property, newValue, min = 0, max = 100) => {
    updateAnnotation({
      [property]: restrictNumber(newValue, min, max),
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
            min={-100}
            max={100}
            isActive={shadowOffsetY !== undefined || shadowOffsetY !== null}
            onChange={(val) =>
              changeSliderValue('shadowOffsetX', val.from, -100, 100)
            }
            value={{ from: shadowOffsetX || 0 }}
          />
        </StyledColumn>
        <StyledColumn>
          <Label>Vertical</Label>
          <StyledSliderField
            annotation="px"
            min={-100}
            max={100}
            isActive={shadowOffsetY !== undefined || shadowOffsetY !== null}
            onChange={(val) =>
              changeSliderValue('shadowOffsetY', val.from, -100, 100)
            }
            value={{ from: shadowOffsetY || 0 }}
          />
        </StyledColumn>
      </StyledTwoColumnsContainer>
      <StyledTwoColumnsContainer>
        <StyledColumn>
          <Label>Blur</Label>
          <StyledSliderField
            annotation="%"
            isActive={shadowBlur >= 0}
            onChange={(val) => changeSliderValue('shadowBlur', val.from)}
            value={{ from: shadowBlur }}
          />
        </StyledColumn>
        <StyledColumn>
          <Label>Transparency</Label>
          <StyledSliderField
            annotation="%"
            isActive={shadowOpacity >= 0}
            onChange={(val) =>
              changeSliderValue('shadowOpacity', val.from / 100, 0, 1)
            }
            value={{ from: shadowOpacity * 100 }}
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
