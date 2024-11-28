/** External Dependencies */
import styled from 'styled-components';
import IconButton from '@scaleflex/ui/core/icon-button';
import { Color as PC } from '@scaleflex/ui/utils/types/palette';

const StyledTopbar = styled.div`
  padding: 16px;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid
    ${({ theme: { palette } }) => palette[PC.BordersSecondary]};

  [data-phone='true'] & {
    padding: 6px 6px 4px 6px;

    ${({ isPhoneScreen }) =>
      isPhoneScreen &&
      `
      padding: 12px 12px 0px;
      gap: 12px;
    `}
  }
`;

const StyledMainButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  order: 1;
`;

const StyledControlButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  order: 3;
  gap: 4px;
`;

const StyledFlexCenterAlignedContainer = styled.div`
  width: ${({ showBackButton }) => (showBackButton ? '318px' : '384px')};
  height: 32px;
  display: block;
  width: 100%;
  order: 4;
  ${({ reverseDirection }) =>
    reverseDirection ? 'flex-direction: row-reverse' : ''};

  @media (min-width: 761px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    order: 2;
  }
`;

const StyledMenuIconButton = styled(IconButton)`
  @media (min-width: 761px) {
    display: none;
  }
`;

export {
  StyledTopbar,
  StyledFlexCenterAlignedContainer,
  StyledMainButtonsWrapper,
  StyledControlButtonsWrapper,
  StyledMenuIconButton,
};
