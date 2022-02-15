/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import Label from '@scaleflex/ui/core/label';

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

  const changeShadowColor = (newShadowColor) => {
    updateAnnotation({ shadowColor: newShadowColor });
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
            hideTrack
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
            hideTrack
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
          <Label>{t('opacity')}</Label>
          <Slider
            annotation="%"
            onChange={(val) =>
              changeSliderValue('shadowOpacity', val / 100, 0, 1)
            }
            value={Math.round(shadowOpacity * 100)}
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
  t: PropTypes.func.isRequired,
};

export default ShadowFields;
