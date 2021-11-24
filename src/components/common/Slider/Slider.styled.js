/** External Dependencies */
import styled from 'styled-components';
import { ContinuousSlider } from '@scaleflex/ui/core';

const StyledSlider = styled(ContinuousSlider)`
  margin-bottom: 8px;
  padding: 0;

  /* TODO: Till fixed on @sfx/ui */
  input {
    max-width: ${({ width }) => width || '100px'};
  }
`;

export { StyledSlider };
