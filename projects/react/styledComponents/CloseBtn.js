import styled from 'styled-components';
import { getHoverColor } from './styleUtils';

const CloseBtn = styled.span.attrs(() => ({
  role: 'button'
}))`
  cursor: pointer;
  position: absolute;
  font-weight: normal;
  top: ${props => props.t || '12px'};
  right: ${props => props.r || 'auto'};
  left: ${props => props.l || '12px'};
  bottom: ${props => props.b || 'auto'};
  font-size: ${props => props.fz || '12px'};
  z-index: 10;
  speak: none;
  background: ${props => props.theme.colors.secondaryBg};
  border-color: ${props => props.theme.colors.secondaryBg};
  color: ${props => props.theme.colors.text};
  text-transform: ${props => props.noCapitalStrs ? 'none' : 'capitalize'};
  min-width: 62px;
  height: 30px;
  border: 0;
  text-align: center;
  line-height: 30px;
  border-radius: 2px;
  
  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  ${props => props.styles};
  
  &:before {
    ${props => !props.children && `content: '\\e90c'`};
    ${props => props.beforeStyles};
  }

  &:hover {
    background: ${props => getHoverColor(props.theme.colors.primaryBg)};
    border-color: ${props => props.theme.colors.primaryBg};
    color: ${props => props.theme.colors.text};  
    ${props => props.hoverStyles};
  }
`;

export { CloseBtn };
