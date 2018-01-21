import styled from 'styled-components';
import { getIconStyles, getIconByName } from '../../lib/styledComponents/styleUtils';

const Toolbar = styled.div`
  height: 100px;
  width: calc(100% - 200px);
  border-left: 1px solid ${props => props.theme.borderDarkColor};
  border-right: 1px solid ${props => props.theme.borderDarkColor};
`;

const ToolWrapper = styled.div`
  padding: 20px 10px;
  cursor: pointer;
  display: inline-block;
  min-width: 80px;
  min-height: 100px;
  text-align: center;
  font-size: 12px;
  color: ${props => props.theme.textColor};
  text-transform: ${props => props.tt || 'capitalize'};
  background: ${props => props.active ? props.theme.mainBackgroundColorActive : 'inherit'};
  
  :hover {
    color: ${props => props.theme.textColorHover};
    background: ${props => props.theme.mainBackgroundColorActive};
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

const EffectsWrapper = styled.div`

`;

const EffectWrapper = styled.div`
  display: inline-block;
  padding: 10px;
  text-align: center;
  min-width: 100px;
  height: 100px;
  cursor: pointer;
  color: ${props => props.theme.textColor};
  font-size: 12px;
  
  :hover {
    background: ${props => props.theme.mainBackgroundColorActive};
  }
`;

const EffectIcon = styled.div`
  background: url('${props => props.src}') 50% 50% / cover no-repeat;
  width: 60px;
  height: 60px;
  border-radius: 2px;
  overflow: hidden;
  display: inline-block;
`;

const EffectLabel = styled.div`
  text-transform: capitalize;
  height: 20px;
  line-height: 20px;
`;

export { Toolbar, ToolWrapper, ToolIcon, ToolLabel, EffectsWrapper, EffectWrapper, EffectIcon, EffectLabel };