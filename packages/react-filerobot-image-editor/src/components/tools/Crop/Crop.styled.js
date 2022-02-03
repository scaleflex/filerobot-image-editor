/** External Dependencies */
import styled from 'styled-components';
import Button from '@scaleflex/ui/core/button';
import Label from '@scaleflex/ui/core/label';

const StyledOpenMenuButton = styled(Button)`
  margin: 0 0 0 6px;
  padding: 0;
`;

const StyledMenuItemIcon = styled.div`
  margin-right: 6px;

  svg {
    vertical-align: middle;
  }
`;

const StyledRatioLabel = styled(Label)`
  margin-left: 4px;
`;

export { StyledOpenMenuButton, StyledMenuItemIcon, StyledRatioLabel };
