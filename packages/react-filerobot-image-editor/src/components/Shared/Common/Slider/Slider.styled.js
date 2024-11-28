/** External Dependencies */
import styled from 'styled-components';
import Slider from '@scaleflex/ui/core/slider';
import { Color as PC } from '@scaleflex/ui/utils/types/palette';

const StyledSlider = styled(Slider)`
  width: ${({ width }) => width || '104px'};
  max-width: ${({ width }) => width || '104px'};
  user-select: none;
  padding: 0;
  margin-bottom: ${({ noMargin }) => (noMargin ? '' : '16px')};

  .SfxSlider-thumb {
    background-color: ${({ theme: { palette } }) =>
      palette[PC.AccentStateless]};
  }

  .SfxSlider-Track {
    height: 2px;
    color: ${({ theme: { palette } }) => palette[PC.AccentStateless]};
  }

  .SfxSlider-rail {
    height: 2px;
    background-color: ${({ theme: { palette } }) => palette[PC.BordersItem]};
  }
`;

export { StyledSlider };
