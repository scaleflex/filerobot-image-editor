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
`;

const StyledHistoryButton = styled(IconButton)`
  margin: ${({ margin }) => margin ?? '0 4px'};

  :first-of-type {
    margin: ${({ margin }) => margin ?? '0 4px 0 8px'};
  }
  width: 23px;
  height: 23px;
  padding: 4px;

  :disabled {
    cursor: not-allowed;
  }
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

  input {
    max-width: 100%;
  }
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
};
