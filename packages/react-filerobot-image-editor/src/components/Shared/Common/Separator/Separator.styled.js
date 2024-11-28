import styled from 'styled-components';
import { Color as PC } from '@scaleflex/ui/utils/types/palette';

const StyledSeparator = styled.div`
  display: inline-block;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  border-radius: 1px;
  background: ${({ theme: { palette } }) => palette[PC.BordersSecondary]};
`;

export { StyledSeparator };
