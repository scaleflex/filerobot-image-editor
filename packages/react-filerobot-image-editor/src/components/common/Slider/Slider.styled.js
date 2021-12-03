/** External Dependencies */
import styled from 'styled-components';
import ContinuousSlider from '@scaleflex/ui/core/continuous-slider';

const StyledSlider = styled(ContinuousSlider)`
  margin-bottom: 8px;
  padding: 0;

  /* TODO: Till fixed on @sfx/ui */
  .SfxSlider-annotation {
    width: 50px;
  }
  input {
    max-width: ${({ width }) => width || '100px'};
  }
`;

export { StyledSlider };
