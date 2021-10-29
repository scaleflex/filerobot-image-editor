/** External Dependencies */
import styled from 'styled-components';
import { Button, IconButton, Label } from '@scaleflex/ui/core';
import iconButton from '@scaleflex/ui/core/icon-button';

const StyledTopbar = styled.div`
  position: relative;
  height: 38px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const StyledHistoryButton = styled(IconButton)`
  margin: 0 8px;
  width: 23px;
  height: 23px;
  padding: 4px;
`;

const StyledSmallButton = styled(iconButton)`
  width: 20px;
  height: 20px;
  margin: 0 ${(props) => props.horizontalMargin || '4px'};
  padding: 4px;
`;

const StyledFlexCenterAlignedContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledSaveButtonWrapper = styled.div`
  height: 22px;
  display: flex;
  align-items: center;
`;

const StyledSaveButton = styled(Button)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  height: 100%;
  font-weight: 500;
  padding: 4px 8px;

  span {
    font-size: 12px;
    line-height: 14px;
  }
`;

const StyledSaveAsButton = styled(IconButton)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin-left: 1px;
  height: 100%;
  padding: 4px 8px;

  svg {
    transform: rotate(90deg);
  }
`;

const StyledZoomPercentageLabel = styled(Label)`
  cursor: pointer;
`;

export {
  StyledTopbar,
  StyledFlexCenterAlignedContainer,
  StyledHistoryButton,
  StyledSmallButton,
  StyledSaveButton,
  StyledSaveAsButton,
  StyledSaveButtonWrapper,
  StyledZoomPercentageLabel,
};
