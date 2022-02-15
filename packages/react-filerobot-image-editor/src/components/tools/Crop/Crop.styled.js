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

  svg,
  span {
    vertical-align: middle;
  }
`;

const StyledRatioDescription = styled(Label)`
  margin-left: 4px;
  cursor: pointer;
`;

export { StyledOpenMenuButton, StyledMenuItemIcon, StyledRatioDescription };
