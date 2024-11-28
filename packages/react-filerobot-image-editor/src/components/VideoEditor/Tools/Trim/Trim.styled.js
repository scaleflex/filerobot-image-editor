/** External Dependencies */
import styled, { css } from 'styled-components';
import { Color as PC } from '@scaleflex/ui/utils/types/palette';
import { Skeleton, Slider } from '@scaleflex/ui/core';

const StyledSegmentSkeleton = styled(Skeleton)`
  border-radius: 4px;
`;

const StyledSlider = styled(Slider)(
  ({ hidden }) => css`
    display: ${hidden ? 'none' : 'block'};
    width: 100%;
    height: 72px;
    padding: 0;
  `,
);

const StyledTrimSliderThumb = styled.span(
  ({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 84px;
    width: 2px;
    transform: translate(-50%, -50%);
    top: 50%;
    background-color: ${theme.palette[PC.SuccessHover]};
    z-index: 2;

    & > input {
      border: 0px;
      clip: rect(0px, 0px, 0px, 0px);
      height: 100%;
      margin: -1px;
      overflow: hidden;
      padding: 0px;
      position: absolute;
      white-space: nowrap;
      width: 100%;
      direction: ltr;
    }

    &::before {
      position: absolute;
      content: '';
      border-radius: inherit;
      width: 100%;
      height: 100%;
      box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
        0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    }

    &::after {
      position: absolute;
      content: '';
      border-radius: 50%;
      width: 20px;
      height: 84px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `,
);

const StyledTrimWrapper = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    position: relative;

    &:has(${StyledTrimSliderThumb}:hover) #highlighted-segment {
      color: ${theme.palette[PC.AccentPrimaryHover]};
    }
  `,
);

const StyledRailWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  background-color: #f2f1f4;
  border-radius: 4px;
`;

const StyledRailLine = styled.hr(
  ({ theme }) => css`
    border: 0;
    height: 2px;
    background-color: ${theme.palette[PC.IconsMuted]};
    width: 100%;
  `,
);

const StyledSegmentWrapper = styled.div`
  position: absolute;
  height: 72px;
`;

const StyledSegment = styled.div.attrs((props) => ({
  style: {
    left: props.left,
    width: props.width,
  },
}))(
  ({ theme, isHighlighted }) => css`
    position: relative;
    z-index: 1;
    height: 100%;
    border-radius: 4px;
    box-sizing: border-box;
    border-width: 3px 12px;
    border-style: solid;

    color: ${isHighlighted
      ? theme.palette[PC.AccentStateless]
      : theme.palette[PC.BordersPrimaryHover]};

    &:hover {
      color: ${theme.palette[PC.AccentPrimaryHover]};
    }

    &:has(> *:active) {
      color: ${theme.palette[PC.AccentPrimaryHover]};
    }
  `,
);

const StyledSegmentHandle = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
  left: 10px;
`;

const StyledHandle = styled.div`
  position: absolute;
  top: 0;
  left: 0px;
  width: 20px;
  height: 100%;
  cursor: col-resize;
`;

const StyledRightHandle = styled(StyledHandle)`
  left: -10px;
`;

const StyledTrimButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 8px 16px;
`;

export {
  StyledTrimWrapper,
  StyledSlider,
  StyledSegmentSkeleton,
  StyledTrimSliderThumb,
  StyledRailWrapper,
  StyledRailLine,
  StyledSegmentWrapper,
  StyledSegment,
  StyledSegmentHandle,
  StyledHandle,
  StyledRightHandle,
  StyledTrimButtonsWrapper,
};
