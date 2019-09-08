import styled from 'styled-components';
import { getIconStyles, getIconByName } from './styleUtils';


const OrientationWrapper = styled.div`
  color: ${props => props.theme.colors.text.base};
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
        background: white;
      }
      
      &::-moz-range-thumb {
        border: none;
        width: 9px;
        height: 18px;
        border-radius: 50%;
        background: white;
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
`;

const RotateWrapper = styled.div`
  display: inline-block;
  //padding: 20px;
`;

const RotateLabel = styled.div`

`;

const RotateButton = styled.div`
  margin-top: 10px;
  
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

const RotateIcon = styled.span`
  ${props => getIconStyles(props)}
  ${props => getIconByName(props.name)}
  height: 16px;
  font-size: 16px;
  margin-top: -4px;
  display: inline-block;
  vertical-align: middle;
  color: ${props => props.theme.colors.text.base};
  margin-right: 5px;
`;

export { OrientationWrapper, RotateWrapper, RotateButton, RotateLabel, RotateIcon }