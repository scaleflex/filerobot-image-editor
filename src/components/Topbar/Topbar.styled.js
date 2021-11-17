/** External Dependencies */
import styled from 'styled-components';
import { IconButton, Label } from '@scaleflex/ui/core';
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
  margin: 0 4px;

  :first-of-type {
    margin: 0 4px 0 8px;
  }
  width: 23px;
  height: 23px;
  padding: 4px;

  :disabled {
    cursor: not-allowed;
  }
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

const StyledZoomPercentageLabel = styled(Label)`
  cursor: pointer;
`;

export {
  StyledTopbar,
  StyledFlexCenterAlignedContainer,
  StyledHistoryButton,
  StyledSmallButton,
  StyledZoomPercentageLabel,
};
