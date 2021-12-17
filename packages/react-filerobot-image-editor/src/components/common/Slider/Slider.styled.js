/** External Dependencies */
import styled from 'styled-components';
import ContinuousSlider from '@scaleflex/ui/core/continuous-slider';

const StyledSlider = styled(ContinuousSlider)`
  margin-bottom: 8px;
  padding: 0;
  user-select: none;

  .SfxSlider-annotation {
    width: 50px;
    font-size: 13px;
    line-height: 16px;
  }
  input {
    max-width: ${({ width }) => width || '100px'};
  }
`;

export { StyledSlider };
