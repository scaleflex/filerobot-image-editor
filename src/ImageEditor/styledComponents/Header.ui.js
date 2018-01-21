import styled from 'styled-components';

const HeaderWrapper = styled.div`
  background: ${props => props.theme.mainBackgroundColorHover};
`;

const HeaderTop = styled.div`
  line-height: 35px;
  border-bottom: 1px solid ${props => props.theme.borderDarkColor};
`;

const Title = styled.div`
  text-align: center;
  text-transform: capitalize;
  color: ${props => props.theme.textColor}
`;

const LeftActions = styled.div`
  text-align: center;
  width: 100px;
  padding: 5px 10px;
`;

const RightActions = styled.div`
  text-align: center;
  width: 100px;
  padding: 5px 10px;
`;

const ToolbarWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  background: ${props => props.theme.mainBackgroundColorHover}
`;

export { HeaderWrapper, HeaderTop, Title, LeftActions, RightActions, ToolbarWrapper };