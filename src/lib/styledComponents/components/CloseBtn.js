import styled from 'styled-components';
import { getIconStyles, getIconByName } from '../styleUtils';


const CloseBtn = styled.span`
  cursor: pointer;
  position: absolute;
  font-weight: bold;
  top: ${props => props.t || '10px'};
  right: ${props => props.r || '10px'};
  left: ${props => props.l || 'auto'};
  bottom: ${props => props.b || 'auto'};
  font-size: ${props => props.fz || '18px'};

  ${props => getIconStyles(props)}
  ${getIconByName('cross')}
  
  color: ${props => props.theme.textMuted}
`;

export { CloseBtn };