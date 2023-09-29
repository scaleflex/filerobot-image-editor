/** External Dependencies */
import styled from 'styled-components';
import { IconButton, RotationSlider } from '@scaleflex/ui/core';
import { Color as PC } from '@scaleflex/ui/utils/types/palette';

const StyledRotationOptions = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const StyledRotationSlider = styled(RotationSlider)`
  margin-bottom: 20px;

  .SfxRotationSlider-control {
    width: 1px;
    height: 10px;
    background-color: ${({ theme: { palette } }) => palette[PC.IconsSecondary]};
  }
`;

const StyledRotateButton = styled(IconButton)`
  margin-top: 4px;
`;

export { StyledRotationOptions, StyledRotationSlider, StyledRotateButton };
