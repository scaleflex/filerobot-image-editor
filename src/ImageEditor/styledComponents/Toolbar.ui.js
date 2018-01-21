import styled from 'styled-components';
import { getIconStyles, getIconByName } from '../../lib/styledComponents/styleUtils';

const Toolbar = styled.div`
  height: 70px;
  width: calc(100% - 200px);
  border-left: 1px solid ${props => props.theme.borderDarkColor};
  border-right: 1px solid ${props => props.theme.borderDarkColor};
`;

const ToolWrapper = styled.div`
  padding: 5px;
  cursor: pointer;
  display: inline-block;
  min-width: 70px;
  min-height: 70px;
  text-align: center;
  font-size: 12px;
  color: ${props => props.theme.textColor};
  text-transform: ${props => props.tt || 'capitalize'};
  
  :hover {
    color: ${props => props.theme.textColorHover};
    background: ${props => props.theme.mainBackgroundColorActive}
  }
`;

const ToolIcon = styled.div`
  height: 40px;
  font-size: 40px;
  
  ${props => getIconStyles(props)}
  ${props => getIconByName(props.name)}
`;

const ToolLabel = styled.div`
  height: 20px;
  line-height: 20px;
`;


export { Toolbar, ToolWrapper, ToolIcon, ToolLabel };