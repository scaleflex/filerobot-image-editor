/** External dependencies */
import styled from 'styled-components';
import InputGroup from '@scaleflex/ui/core/input-group';
import SelectGroup from '@scaleflex/ui/core/select-group';
import Label from '@scaleflex/ui/core/label';

const StyledFileNameInput = styled(InputGroup)``;

const StyledFileExtensionSelect = styled(SelectGroup)`
  margin-top: 16px;
`;

const StyledQualityWrapper = styled.div`
  width: 100%;
  margin-top: 16px;
`;

const StyledResizeOnSave = styled.div`
  margin-top: 16px;
  width: 100%;
`;

const StyledResizeOnSaveLabel = styled(Label)`
  margin-bottom: 4px;
`;

export {
  StyledFileNameInput,
  StyledFileExtensionSelect,
  StyledQualityWrapper,
  StyledResizeOnSave,
  StyledResizeOnSaveLabel,
};
