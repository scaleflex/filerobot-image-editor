/** External Dependencies */
import styled from 'styled-components';
import { ContinuousSlider } from '@scaleflex/ui/core';

const StyledSlider = styled(ContinuousSlider)`
  width: ${({ width }) => width || '100px'};
  margin-bottom: 8px;
`;

export { StyledSlider };
