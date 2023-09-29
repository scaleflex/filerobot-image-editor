/** External Dependencies */
import styled from 'styled-components';
import Input from '@scaleflex/ui/core/input';
import Select from '@scaleflex/ui/core/select';

const StyledFontFamilySelect = styled(Select)`
  width: 160px;
`;

const StyledFontSizeInput = styled(Input)`
  width: 72px;
`;

const StyledToolsWrapper = styled.div`
  display: flex;
`;

export { StyledFontFamilySelect, StyledFontSizeInput, StyledToolsWrapper };
