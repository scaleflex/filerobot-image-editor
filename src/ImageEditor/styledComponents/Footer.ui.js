import styled from 'styled-components';
import { getIconStyles, getIconByName } from '../../lib/styledComponents/styleUtils';


const Footer = styled.div`
  background: ${props => props.theme.mainBackgroundColorHover};
  height: 34px;
  position: relative;
  z-index: 1;
`;

const PreviousBtn = styled.div`
  ${props => getIconStyles(props)}
  ${getIconByName('previous')}
  
  ${props => getActionIconStyle(props)}
`;

const NextBtn = styled.div`
  ${props => getIconStyles(props)}
  ${getIconByName('next')}
  
  ${props => getActionIconStyle(props)}
`;

function getActionIconStyle(props) {
  return `
    display: inline-block;
    height: 34px;
    width: 34px;
    cursor: pointer;
    text-align: center;
    line-height: 34px;
    border-right: 1px solid ${props.theme.borderDarkColor};
    
    :hover {
      background: ${props.theme.mainBackgroundColorActive};
    }
  `;
}

export { Footer, PreviousBtn, NextBtn };