import { Button, IconButton } from '@scaleflex/ui/core';
import styled from 'styled-components';

const StyledTitleBar = styled.div`
  position: relative;
  height: 46px;
  width: 100%;
`;

const StyledSaveButton = styled(Button)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  height: 100%;
  font-weight: 500;

  span {
    font-size: 12px !important;
    line-height: 14px !important;
  }
`;

const StyledSaveAsButton = styled(IconButton)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin-left: 1px;
  height: 100%;

  svg {
    transform: rotate(90deg);
  }
`;

const StyledSaveButtonWrapper = styled.div`
  height: 42px;
  display: flex;
  align-items: center;
`;

const TitleBarLeft = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 12px;
`;

const TitleBarCenter = styled.div`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  pointer-events: none;
`;

const TitleBarRight = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 12px;
`;

export {
  StyledTitleBar,
  StyledSaveButton,
  StyledSaveAsButton,
  TitleBarLeft,
  TitleBarCenter,
  TitleBarRight,
  StyledSaveButtonWrapper,
}
