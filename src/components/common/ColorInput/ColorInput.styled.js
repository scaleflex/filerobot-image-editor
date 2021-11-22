/** External Dependencies */
import styled from 'styled-components';

const StyledPickerTrigger = styled.div.attrs(({ color }) => ({
  style: {
    backgroundColor: color,
  },
}))`
  background-color: ${({ theme }) => theme.palette['icons-primary']};
  border-radius: 2px;
  width: 24px;
  height: 24px;
  border: 2px solid ${({ theme }) => theme.palette['borders-strong']};
  cursor: pointer;
  box-sizing: border-box;
`;

const StyledPickerWrapper = styled.div`
  background-color: ${({ theme }) => theme.palette['bg-secondary']};
  box-shadow: 0px 1px 2px rgba(78, 77, 77, 0.15);
  border-radius: 2px;
  padding: 12px;
  max-width: 300px;
`;

const StyledColorRangePickerWrapper = styled.div`
  position: relative;
  width: 186px;
  height: 180px;
`;

const StyledColorRangePicker = styled.canvas`
  display: block;
  border-radius: 2px;
  width: 100%;
  height: 100%;
`;

const StyledColorsSliderWrapper = styled.div`
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

const StyledColorStop = styled.td.attrs(({ color }) => ({
  style: {
    backgroundColor: color,
  },
}))`
  padding: 0;
  &:first-child,
  &:last-child {
    border-radius: 4px;
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
  background-color: ${theme.palette['accent-primary']};
  position: absolute;
  cursor: pointer;
  z-index: 11;
  user-select: none;
  outline: none;
`,
);

export {
  StyledPickerTrigger,
  StyledPickerWrapper,
  StyledColorRangePickerWrapper,
  StyledColorRangePicker,
  StyledColorsSliderWrapper,
  StyledColorsBar,
  StyledColorPointer,
  StyledColorStop,
};
