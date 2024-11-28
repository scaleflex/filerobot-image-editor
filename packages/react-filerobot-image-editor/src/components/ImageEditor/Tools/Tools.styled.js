/** External Dependencies */
import { Input, Label } from '@scaleflex/ui/core';
import styled from 'styled-components';
import { FontVariant as FV } from '@scaleflex/ui/utils/types/typography';

const StyledHSVOptions = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 10px;

  .SfxSlider-root {
    min-width: 100px;
  }

  ${({ isPhoneScreen }) =>
    isPhoneScreen &&
    `
      flex-direction: column;

      .SfxSlider-root {
        min-width: 230px;
      }
    `}
`;

const StyledSliderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSliderLabel = styled(Label)`
  ${({ theme }) => theme.typography.font[FV.LabelExtraSmallUp]};
`;

const StyledSliderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledSliderInput = styled(Input)`
  display: inline-block;
  width: 40px;
  height: 28px;
  padding: 6px 2px;
  margin-left: 10px;
  border: none;

  .SfxInput-Base {
    text-align: center;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`;

export {
  StyledHSVOptions,
  StyledSliderContainer,
  StyledSliderLabel,
  StyledSliderWrapper,
  StyledSliderInput,
};
