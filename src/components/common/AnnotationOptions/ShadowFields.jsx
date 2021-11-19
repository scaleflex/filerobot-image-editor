/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Label } from '@scaleflex/ui/core';

/** Internal Dependencies */
import restrictNumber from 'utils/restrictNumber';
import ColorInput from 'components/common/ColorInput';
import {
  StyledHeadline,
  StyledTwoColumnsContainer,
  StyledColumn,
  StyledSpacedOptionFields,
} from './AnnotationOptions.styled';
import Slider from '../Slider';

const ShadowFields = ({ annotation, updateAnnotation, t }) => {
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
      <StyledHeadline>{t('shadow')}</StyledHeadline>
      <StyledTwoColumnsContainer>
        <StyledColumn>
          <Label>{t('horizontal')}</Label>
          <Slider
            annotation="px"
            min={-100}
            max={100}
            onChange={(val) =>
              changeSliderValue('shadowOffsetX', val, -100, 100)
            }
            value={shadowOffsetX || 0}
            hideOverlay
          />
        </StyledColumn>
        <StyledColumn>
          <Label>{t('vertical')}</Label>
          <Slider
            annotation="px"
            min={-100}
            max={100}
            onChange={(val) =>
              changeSliderValue('shadowOffsetY', val, -100, 100)
            }
            value={shadowOffsetY || 0}
            hideOverlay
          />
        </StyledColumn>
      </StyledTwoColumnsContainer>
      <StyledTwoColumnsContainer>
        <StyledColumn>
          <Label>{t('blur')}</Label>
          <Slider
            annotation="%"
            onChange={(val) => changeSliderValue('shadowBlur', val)}
            value={shadowBlur}
          />
        </StyledColumn>
        <StyledColumn>
          <Label>{t('transparency')}</Label>
          <Slider
            annotation="%"
            onChange={(val) =>
              changeSliderValue('shadowOpacity', val / 100, 0, 1)
            }
            value={shadowOpacity * 100}
          />
        </StyledColumn>
      </StyledTwoColumnsContainer>
      <ColorInput color={shadowColor} onChange={changeShadowColor} />
    </StyledSpacedOptionFields>
  );
};

ShadowFields.propTypes = {
  annotation: PropTypes.instanceOf(Object).isRequired,
  updateAnnotation: PropTypes.func.isRequired,
};

export default ShadowFields;
