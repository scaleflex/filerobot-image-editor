/** External Dependencies */
import styled from 'styled-components';
import Button from '@scaleflex/ui/core/button';
import IconButton from '@scaleflex/ui/core/icon-button';
import Input from '@scaleflex/ui/core/input';
import Label from '@scaleflex/ui/core/label';
import Select from '@scaleflex/ui/core/select';

const StyledTopbar = styled.div`
  padding: 12px 12px 8px 12px;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ reverseDirection }) =>
    reverseDirection ? 'flex-direction: row-reverse' : ''};

  [data-phone='true'] & {
    padding: 6px 6px 4px 6px;
  }
  overflow: auto;
`;

const StyledHistoryButtonsWrapper = styled.div`
  display: flex;
  margin: 0 4px;
  column-gap: 4px;
  align-items: center;
`;

const StyledHistoryButton = styled(IconButton)`
  margin: ${({ margin }) => margin ?? '0 4px'};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  padding: 2px;
`;

const StyledDimensionsLabel = styled(Label)`
  flex-shrink: 0;
`;

const StyledSmallButton = styled(IconButton)`
  width: 20px;
  height: 20px;
  margin: 0 ${(props) => props.horizontalMargin ?? '4px'};
  padding: 4px;
`;

const StyledFlexCenterAlignedContainer = styled.div`
  display: flex;
  align-items: center;
  ${({ reverseDirection }) =>
    reverseDirection ? 'flex-direction: row-reverse' : ''};
`;

const StyledZoomPercentageLabel = styled(Label)`
  cursor: pointer;
`;

const StyledBackButtonLabel = styled.span`
  font-size: 11px;
  line-height: 12px;
`;

const StyledCloseOrBackButton = styled(IconButton)`
  padding: 0;
  z-index: 111;
`;

const StyledSaveButton = styled(Button)`
  padding: 4px 12px;
`;

const StyledFileNameInput = styled(Input)`
  width: 200px;
`;

const StyledFileExtensionSelect = styled(Select)`
  width: 60px;
  margin-left: 4px;
`;

const StyledQualityWrapper = styled.div`
  width: 100%;
  margin-top: 8px;
`;

const StyledResizeOnSave = styled.div`
  margin-top: 8px;
  width: 100%;
`;

export {
  StyledTopbar,
  StyledFlexCenterAlignedContainer,
  StyledHistoryButton,
  StyledSmallButton,
  StyledZoomPercentageLabel,
  StyledBackButtonLabel,
  StyledCloseOrBackButton,
  StyledSaveButton,
  StyledFileNameInput,
  StyledFileExtensionSelect,
  StyledQualityWrapper,
  StyledResizeOnSave,
  StyledDimensionsLabel,
  StyledHistoryButtonsWrapper,
};
