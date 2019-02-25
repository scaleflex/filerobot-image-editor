import styled from 'styled-components';
import { getIconStyles, getIconByName } from './styleUtils';


const Toolbar = styled.div`
  height: 100px;
  width: calc(100% - 200px);
  border-left: 1px solid ${props => props.theme.colors.dark.base};
  border-right: 1px solid ${props => props.theme.colors.dark.base};
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  
  ::-webkit-scrollbar {
    height: 10px !important;
  }
   
  ::-webkit-scrollbar-thumb {
    background: #3b4d54;
    border-radius: 5px;
  }
`;

const ToolWrapper = styled.div`
  padding: 20px 10px;
  cursor: pointer;
  display: inline-block;
  min-width: 80px;
  min-height: 100px;
  text-align: center;
  font-size: 12px;
  color: ${props => props.theme.colors.text.base};
  text-transform: ${props => props.tt || 'capitalize'};
  background: ${props => props.active ? props.theme.colors.primary.lighter : 'inherit'};
  
  :hover {
    color: ${props => props.theme.colors.text.light};
    background: ${props => props.theme.colors.primary.lighter};
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
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  
  ::-webkit-scrollbar {
    height: 10px !important;
  }
   
  ::-webkit-scrollbar-thumb {
    background: #3b4d54;
    border-radius: 5px;
  }
`;

const EffectWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  padding: 10px;
  text-align: center;
  min-width: 90px;
  height: 90px;
  cursor: pointer;
  color: ${props => props.theme.textColor};
  font-size: 12px;
  
  :hover {
    background: ${props => props.theme.colors.primary.lighter};
  }
`;

const EffectIcon = styled.div`
  background: url('${props => props.src}') 50% 50% / cover no-repeat;
  width: 55px;
  height: 55px;
  border-radius: 2px;
  overflow: hidden;
  display: inline-block;
`;

const EffectLabel = styled.div`
  text-transform: capitalize;
  height: 20px;
  line-height: 20px;
`;

export {
  Toolbar, ToolWrapper, ToolIcon, ToolLabel, EffectsWrapper, EffectWrapper, EffectIcon, EffectLabel
};