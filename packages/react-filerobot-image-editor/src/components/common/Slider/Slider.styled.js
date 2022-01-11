/** External Dependencies */
import styled from 'styled-components';
import Slider from '@scaleflex/ui/core/slider';

const StyledSlider = styled(Slider)`
  width: ${({ width }) => width || '100px'};
  max-width: ${({ width }) => width || '100px'};
  user-select: none;
  margin-bottom: 24px;

  .SfxSlider-annotation {
    font-size: 13px;
    line-height: 16px;
  }
`;

export { StyledSlider };
