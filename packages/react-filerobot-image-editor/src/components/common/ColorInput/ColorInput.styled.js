/** External Dependencies */
import styled from 'styled-components';
import ColorPicker from '@scaleflex/ui/core/color-picker';

const StyledPickerTrigger = styled.div.attrs(({ $color }) => ({
  style: {
    background:
      $color === 'rgba(0,0,0,0)'
        ? 'repeating-conic-gradient(#5d6d7e 0% 25%, transparent 0% 50%) 50% / 8px 8px'
        : $color,
  },
}))`
  background: ${({ theme }) => theme.palette['icons-primary']};
  border-radius: 2px;
  width: 24px;
  height: 24px;
  border: 2px solid ${({ theme }) => theme.palette['borders-strong']};
  cursor: pointer;
  box-sizing: border-box;
`;

const StyledColorPicker = styled(ColorPicker)`
  max-width: 212px;
`;

export { StyledPickerTrigger, StyledColorPicker };
