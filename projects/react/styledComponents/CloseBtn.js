import styled from 'styled-components';
import { getHoverColor } from './styleUtils';

const CloseBtn = styled.span.attrs(() => ({
  role: 'button'
}))`
  cursor: pointer;
  position: absolute;
  font-weight: normal;
  top: ${props => props.t || 0};
  right: ${props => props.r || '12px'};
  left: ${props => props.l};
  bottom: ${props => props.b || 'auto'};
  font-size: ${props => props.fz || '22px'};
  z-index: 10;
  speak: none;
  color: ${props => props.theme.colors.text};
  font-family: 'filerobot-image-editor-font' !important;
  font-style: normal;
  font-variant: normal;
  text-transform: none;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  &:hover {
    filter: brightness(0.7);
  }
  
  &:before {
    content: '\\e90c';
  }
`;

export { CloseBtn };
