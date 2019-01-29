import styled from 'styled-components';
import { variables } from './styleUtils';

const CloseBtn = styled.span.attrs({
  role: 'button'
})`
  cursor: pointer;
  position: absolute;
  font-weight: normal;
  top: ${props => props.t || '10px'};
  right: ${props => props.r || '10px'};
  left: ${props => props.l || 'auto'};
  bottom: ${props => props.b || 'auto'};
  font-size: ${props => props.fz || '18px'};
  z-index: 10;
  font-family: 'scaleflex-icon-font' !important;
  color: ${props => variables.modal.colorMuted};
  speak: none;
  font-style: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  :hover {
    color: ${props => variables.modal.colorMutedHover};
  }
  
  :before {
      content: '\\e90c'
    }
`;

export { CloseBtn };