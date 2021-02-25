import styled from 'styled-components';
import { Button } from './Button';
import { getHoverColor } from './styleUtils';

const HeaderWrapper = styled.div`
  background: ${props => props.theme.colors.secondaryBg};
`;

const HeaderTop = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.primaryBg};
  background: ${props => props.theme.colors.primaryBg};
  height: 46px;
  line-height: 46px;
  position: relative;
`;

const Title = styled.div`
  text-align: center;
  text-transform: ${props => props.noCapitalStrs ? 'none' : 'capitalize'};
  color: ${props => props.theme.colors.text};
`;

const ButtonsWrapper = styled.div`
  position: absolute;
  top: 7px;
  left: 12px;
  display: flex;
  align-items: center;
`;

const BackButtonWrapper = styled.div`
  height: 32px;
  display: flex;
  align-items: center;

  svg {
    cursor: pointer;
    padding: 9px 12px 9px 0;
    width: 38px;
    height: 32px;

    path {
      fill: ${props => props.theme.colors.text};
    }

    &:hover {
      filter: brightness(0.7);
    }
  }
`;

const BackBtnSeparator = styled.div`
  height: 100%;
  width: 1px;
  display: inline-block;
  margin-right: 12px;
  background: ${props => props.theme.colors.border};
`;

const CancelBtn = styled(Button)`
  background: ${props => props.theme.colors.primaryBg};
  border-color: ${props => props.theme.colors.primaryBg};
  color: ${props => props.theme.colors.text};
  text-transform: ${props => props.noCapitalStrs ? 'none' : 'capitalize'};
  min-width: 62px;
  height: 32px;
  margin-right: 8px;
  border: 0;

  &:hover {
    background: ${props => getHoverColor(props.theme.colors.primaryBg)};
    border-color: ${props => props.theme.colors.primaryBg};
    color: ${props => props.theme.colors.text};  
  }
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

export {
  HeaderWrapper,
  HeaderTop,
  Title,
  ButtonsWrapper,
  BackButtonWrapper,
  BackBtnSeparator,
  ToolbarWrapper,
  CancelBtn
};
