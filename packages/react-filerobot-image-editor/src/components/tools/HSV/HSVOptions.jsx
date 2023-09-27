/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import Konva from 'konva';

/** Internal Dependencies */
import { useFinetune, usePhoneScreen } from 'hooks';
import Slider from 'components/common/Slider';
import {
  StyledHSVOptions,
  StyledSliderContainer,
  StyledSliderLabel,
  StyledSliderInput,
  StyledSliderWrapper,
} from '../tools.styled';

const DEFAULT_VALUE = {
  hue: 0,
  saturation: 0,
  value: 0,
};

const MAX_VALUE = {
  hue: 259,
  saturation: 10,
  value: 2,
};

const sliderStyle = { padding: 0, margin: 0 };
const isPhoneScreen = usePhoneScreen();

const HSVOptions = ({ t }) => {
  const [finetuneProps, setFinetuneProps] = useFinetune(
    Konva.Filters.HSV,
    DEFAULT_VALUE,
  );

  const changeValue = (name, value) => {
    setFinetuneProps({
      [name]: value > MAX_VALUE[name] ? MAX_VALUE[name] : +value,
    });
  };

  return (
    <StyledHSVOptions isPhoneScreen={isPhoneScreen}>
      <StyledSliderContainer className="FIE_hue-option-wrapper">
        <StyledSliderLabel className="FIE_hue-option-label">
          {t('hue')}
        </StyledSliderLabel>
        <StyledSliderWrapper>
          <Slider
            className="FIE_hue-option"
            min={0}
            step={1}
            max={259}
            value={finetuneProps.hue ?? DEFAULT_VALUE.hue}
            onChange={(val) => changeValue('hue', val)}
            style={sliderStyle}
          />
          <StyledSliderInput
            value={finetuneProps.hue ?? DEFAULT_VALUE.hue}
            onChange={({ target: { value } }) => changeValue('hue', value)}
          />
        </StyledSliderWrapper>
      </StyledSliderContainer>
      <StyledSliderContainer className="FIE_saturation-option-wrapper">
        <StyledSliderLabel className="FIE_saturation-option-label">
          {t('saturation')}
        </StyledSliderLabel>
        <StyledSliderWrapper>
          <Slider
            className="FIE_saturation-option"
            min={-2}
            step={0.5}
            max={10}
            value={finetuneProps.saturation ?? DEFAULT_VALUE.saturation}
            onChange={(val) => changeValue('saturation', val)}
            style={sliderStyle}
          />
          <StyledSliderInput
            value={finetuneProps.saturation ?? DEFAULT_VALUE.saturation}
            onChange={({ target: { value } }) =>
              changeValue('saturation', value)
            }
          />
        </StyledSliderWrapper>
      </StyledSliderContainer>
      <StyledSliderContainer className="FIE_value-option-wrapper">
        <StyledSliderLabel className="FIE_value-option-label">
          {t('value')}
        </StyledSliderLabel>
        <StyledSliderWrapper>
          <Slider
            className="FIE_value-option"
            min={-2}
            step={0.1}
            max={2}
            value={finetuneProps.value ?? DEFAULT_VALUE.value}
            onChange={(val) => changeValue('value', val)}
            style={sliderStyle}
          />
          <StyledSliderInput
            value={finetuneProps.value ?? DEFAULT_VALUE.value}
            onChange={({ target: { value } }) => changeValue('value', value)}
          />
        </StyledSliderWrapper>
      </StyledSliderContainer>
    </StyledHSVOptions>
  );
};

HSVOptions.propTypes = {
  t: PropTypes.func.isRequired,
};

export default HSVOptions;
