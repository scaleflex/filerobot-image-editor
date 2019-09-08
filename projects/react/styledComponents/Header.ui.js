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
  text-transform: capitalize;
  color: ${props => props.theme.colors.text}
`;

const LeftActions = styled.div`
  text-align: center;
  width: 100px;
  padding: 5px 10px;
`;

const RightActions = styled.div`
  text-align: center;
  width: 115px;
  padding: 5px 10px;
`;

const ToolbarWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  background: ${props => props.theme.colors.secondaryBg}
`;

const CancelBtn = styled(Button)`
  background: ${props => props.theme.colors.primaryBg};
  border-color: ${props => props.theme.colors.primaryBg};
  color: ${props => props.theme.colors.text};
  text-transform: capitalize;
  
  :hover {
    background: ${props => getHoverColor(props.theme.colors.primaryBg)};
    border-color: ${props => props.theme.colors.primaryBg};
    color: ${props => props.theme.colors.text};  
  }
`;

const DarkBtn = styled(CancelBtn)``;

export { HeaderWrapper, HeaderTop, Title, LeftActions, RightActions, ToolbarWrapper, CancelBtn, DarkBtn };