/** External Dependencies */
import styled from 'styled-components';

const StyledPickerTrigger = styled.div.attrs(({ $color }) => ({
  style: {
    backgroundColor: $color,
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

const StyledPickerWrapper = styled.div`
  background: ${({ theme }) => theme.palette['bg-secondary']};
  box-shadow: 0px 1px 2px rgba(78, 77, 77, 0.15);
  border-radius: 2px;
  padding: 12px;
  max-width: 300px;
`;

const StyledColorsBarWrapper = styled.div`
  margin-top: 8px;
  position: relative;
  width: 186px;
  height: 12px;
`;

const StyledColorsBar = styled.table`
  border-radius: 4px;
  width: 100%;
  height: 8px;
  border-collapse: collapse;
`;

const StyledBarColorStop = styled.td.attrs(({ $color }) => ({
  style: {
    backgroundColor: $color,
  },
}))`
  padding: 0;
  user-select: none;
  pointer-events: none;
  &:first-child {
    width: 4px; // for having the border radius shown clearly
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  &:last-child {
    width: 4px; // for having the border radius shown clearly
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

const StyledColorPointer = styled.span.attrs(
  ({ left = 0, top = 0, considerTopWidth = false, style }) => ({
    style: {
      left: left - 7, // 7
      top: top - (considerTopWidth ? 7 : 0), // 7 = 5  (half width) + 2 (border width)
      ...style,
    },
  }),
)(
  ({ theme }) => `
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 20px;
  box-shadow: 0px 1px 2px rgba(78, 77, 77, 0.15);
  border: 2px solid ${theme.palette['bg-secondary']};
  background: ${theme.palette['accent-primary']};
  position: absolute;
  cursor: pointer;
  z-index: 11;
  user-select: none;
  outline: none;
`,
);

const StyledRangePickerWrapper = styled.div.attrs(({ $color }) => ({
  style: {
    background: $color,
  },
}))`
  position: relative;
  border-radius: 2px;
  width: 186px;
  height: 180px;
  user-select: none;
  cursor: crosshair;
`;

const StyledRangePickerWhiteGradient = styled.div`
  background: linear-gradient(to right, white 0%, rgba(255, 255, 255, 0) 100%);
  z-index: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 2px;
  user-select: none;
  pointer-events: none;
  top: -1px;
`;

const StyledRangePickerBlackGradient = styled.div`
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, black 100%);
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 2px;
  user-select: none;
  pointer-events: none;
`;

export {
  StyledPickerTrigger,
  StyledPickerWrapper,
  StyledColorsBarWrapper,
  StyledColorsBar,
  StyledColorPointer,
  StyledBarColorStop,
  StyledRangePickerWrapper,
  StyledRangePickerWhiteGradient,
  StyledRangePickerBlackGradient,
};
