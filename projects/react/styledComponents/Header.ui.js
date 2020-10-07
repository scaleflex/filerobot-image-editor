import styled from 'styled-components';
import { Button } from './Button';
import { getHoverColor } from './styleUtils';

const HeaderWrapper = styled.div`
  background: ${props => props.theme.colors.secondaryBg};
`;

const HeaderTop = styled.div`
  line-height: 35px;
  border-bottom: 1px solid ${props => props.theme.colors.primaryBg};
  background: ${props => props.theme.colors.primaryBg};
`;

const Title = styled.div`
  text-align: center;
  text-transform: ${props => props.noCapitalStrs ? 'none' : 'capitalize'};
  color: ${props => props.theme.colors.text}
`;

const ActionsWrapper = styled('div')`
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;

const Actions = styled('div')`
  display: inline-block;
  position: absolute;
  top: calc(50% - 20px);
  text-align: center;
  width: 100px;
  padding: 10px 10px 5px;
  
  @media (max-width: 768px) {
    position: initial;
    width: 50%;
  }
`;

const CancelBtn = styled(Button)`
  background: ${props => props.theme.colors.primaryBg};
  border-color: ${props => props.theme.colors.primaryBg};
  color: ${props => props.theme.colors.text};
  text-transform: ${props => props.noCapitalStrs ? 'none' : 'capitalize'};
  
  :hover {
    background: ${props => getHoverColor(props.theme.colors.primaryBg)};
    border-color: ${props => props.theme.colors.primaryBg};
    color: ${props => props.theme.colors.text};  
  }
`;

const LeftActions = styled(Actions)`
  display: ${p => p.hide ? 'none' : 'flex'};
  flex-direction: column;
  justify-content: center;
  left: 0;
  top: 0;
  bottom: 0;
  
  ${CancelBtn}:nth-child(2) {
    margin-top: 5px;
  }
`;

const RightActions = styled(Actions)`
  right: 0;
`;

const ToolbarWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  background: ${props => props.theme.colors.secondaryBg};
  
  @media (max-width: 768px) {
    flex-direction: column;
    height: initial;
  }
`;

export { HeaderWrapper, HeaderTop, Title, LeftActions, RightActions, ToolbarWrapper, CancelBtn, ActionsWrapper };