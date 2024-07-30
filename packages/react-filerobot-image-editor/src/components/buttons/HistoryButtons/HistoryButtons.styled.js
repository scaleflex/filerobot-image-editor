import IconButton from '@scaleflex/ui/core/icon-button';
import styled from 'styled-components';
import { Color as PC } from '@scaleflex/ui/utils/types/palette';

const StyledHistoryButtons = styled.div`
  display: flex;
  gap: 6px;
`;

const StyledHistoryButton = styled(IconButton)`
  margin: ${({ margin }) => margin ?? '0 4px'};

  svg {
    color: ${({ theme: { palette }, disabled }) =>
      !disabled ? palette[PC.IconsPrimary] : palette[PC.BordersDisabled]};
  }
`;

export { StyledHistoryButtons, StyledHistoryButton };
