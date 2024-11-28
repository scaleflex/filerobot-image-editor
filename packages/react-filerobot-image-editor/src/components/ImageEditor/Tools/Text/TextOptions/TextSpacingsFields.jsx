/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import Label from '@scaleflex/ui/core/label';

/** Internal Dependencies */
import restrictNumber from 'utils/restrictNumber';
import { StyledSpacedOptionFields } from 'components/Shared/Common/AnnotationOptions/AnnotationOptions.styled';
import Slider from 'components/Shared/Common/Slider';
import { useStore } from 'hooks';

const MIN_VALUE = 0;
const MAX_VALUE = 1000;
const SLIDER_STEP = 1;

const TextSpacingsFields = ({
  annotation: text,
  updateAnnotation: updateText,
  t,
}) => {
  const { originalSource } = useStore();
  const { letterSpacing, lineHeight, baselineShift, fontSize } = text;

  const updateValue = (
    prop,
    val,
    { min = MIN_VALUE, max = MAX_VALUE } = {},
  ) => {
    updateText({ [prop]: restrictNumber(val, min, max) });
  };

  const maxHorizontal = originalSource?.width || MAX_VALUE;
  const maxVertical = originalSource?.height || MAX_VALUE;
  return (
    <StyledSpacedOptionFields preventFlex>
      <Label>{t('letterSpacing')}</Label>
      <Slider
        annotation="em"
        isActive={Boolean(letterSpacing)}
        onChange={(val) =>
          updateValue('letterSpacing', val, { max: maxHorizontal })
        }
        value={letterSpacing}
        step={0.01}
        max={Math.min(fontSize, 20)}
      />
      <Label>{t('lineHeight')}</Label>
      <Slider
        isActive={Boolean(baselineShift)}
        onChange={(val) => updateValue('lineHeight', val)}
        value={lineHeight}
        step={SLIDER_STEP}
      />
      <Label>{t('baselineShift')}</Label>
      <Slider
        isActive={Boolean(baselineShift)}
        onChange={(val) =>
          updateValue('baselineShift', val, {
            min: -maxVertical,
            max: maxVertical,
          })
        }
        value={baselineShift ?? 0}
        min={-maxVertical}
        max={maxVertical}
        step={SLIDER_STEP}
        hideTrack
      />
    </StyledSpacedOptionFields>
  );
};

TextSpacingsFields.propTypes = {
  annotation: PropTypes.instanceOf(Object).isRequired,
  updateAnnotation: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default TextSpacingsFields;
