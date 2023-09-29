/** External Dependencies */
import styled from 'styled-components';
import { Color as PC } from '@scaleflex/ui/utils/types/palette';

const StyledPickerTrigger = styled.div.attrs(({ $color }) => ({
  style: {
    background:
      $color === 'rgba(0,0,0,0)'
        ? 'repeating-conic-gradient(#5d6d7e 0% 25%, transparent 0% 50%) 50% / 8px 8px'
        : $color,
  },
}))`
  background: ${({ theme }) => theme.palette['icons-primary']};
  border-radius: 4px;
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.palette[PC.BorderPrimaryStateless]};
  cursor: pointer;
  box-sizing: border-box;
`;

export { StyledPickerTrigger };
