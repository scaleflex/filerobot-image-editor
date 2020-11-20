import styled from 'styled-components';
import { getIconStyles, getIconByName } from './styleUtils';
import { CancelBtn } from './Header.ui';


const OrientationWrapper = styled.div`
  color: ${props => props.theme.colors.text};
  text-align: center;
  
  svg {
    margin-top: -7px;
    width: 750px;
    
    text {
      font-size: 2px;
    }
  }
  
  .image-editor-range-wrapper {
    width: 280px;
    padding: 0;
    margin: 12px auto 0;
    
    input#range {
      background: none;
      width: 280px;
      
      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 9px;
        height: 18px;
        border-radius: 50%;
        background: ${p => p.theme.colors.text};
      }
      
      &::-moz-range-thumb {
        border: none;
        width: 9px;
        height: 18px;
        border-radius: 50%;
        background: ${p => p.theme.colors.text};
        cursor: pointer;
      }
    }
    
    label {
      display: none;
    }
    
    :after {
      display: none;
    }
  }
  
  @media (max-width: 768px) {
    svg {
      width: 100%;
    }
  }
`;

const RotateWrapper = styled.div`
  display: inline-block;
  width: 100%;
`;

const RotateButton = styled.div`
  margin-top: 10px;
  width: 100%;
  
  button {
    text-transform: none;
    font-size: 12px;
    min-width: 142px;
    margin-right: 5px;
  }
  
  button:focus,  button:active {
    outline: none !important;
    box-shadow: none !important;
  }
`;

const ButtonGroup = styled('div')`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
`;

const RotateIcon = styled.span`
  ${props => getIconStyles(props)};
  ${props => getIconByName(props.name)};
  height: 16px;
  font-size: 16px;
  margin-top: -4px;
  display: inline-block;
  vertical-align: middle;
  color: ${props => props.theme.colors.text};
  margin-right: 5px;
`;

const DarkBtn = styled(CancelBtn)`
  @media (max-width: 768px) {
    width: 50%;
    margin-right: 0 !important;
  }
`;

export { OrientationWrapper, RotateWrapper, RotateButton, RotateIcon, ButtonGroup, DarkBtn }
