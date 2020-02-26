import styled from 'styled-components';


const WatermarkWrapper = styled.div`
  position: relative;
  color: ${props => props.theme.colors.text};
  text-align: left;
  white-space: normal;
  
  .image-editor-range {
    display: inline-block;
    padding: 5px;
    vertical-align: middle;
  
    :after {
      display: none;
    }
    
    label {
      display: none;
    }
  }
`;

const WrapperForURL = styled('div')`
  padding: 10px;
  
  label {
    min-width: 120px;
    display: inline-block;
    vertical-align: middle;
    margin: 0;
  }
  
  input {
    width: 100%;
  }
`;

const WrapperForControls = styled('div')`
  ${p => {
  if (p.switcherPosition === 'right') {
    return `.cloudimage-url-generator-switch {
        margin-left: 100px;
        margin-top: -6px;
        
        label {
          min-width: auto;
        }
      }`;
  } else {
    return 'padding: 10px;';
  }
}}
`;

const WrapperForOpacity = styled('div')`
  display: inline-block;
  vertical-align: middle;
  padding: 10px;

  label {
    min-width: 120px;
    display: inline-block;
    vertical-align: middle;
  }
`;

const WatermarkInputs = styled('div')`
  width: calc(100% - 200px);
  display: inline-block;
  vertical-align: top;
`;

const WatermarkPositionWrapper = styled('div')`
  width: 100px;
  padding: 5px;
  display: inline-block;
  font-size: 0;
  
  div:nth-child(1) {
    border-radius: 4px 0 0 0;
  }
  
  div:nth-child(3) {
    border-radius: 0 4px 0 0;
  }
  
  div:nth-child(7) {
    border-radius: 0 0 0 4px;
  }
  
  div:nth-child(9) {
    border-radius: 0 0 4px 0;
  }
`;

const WatermarkInputTypes = styled('div')`
  width: 100px;
  padding: 20px 10px 10px 10px;
  display: inline-block;
  vertical-align: top;
  
  /* The container */
  label {
    display: block;
    position: relative;
    line-height: 12px;
    padding-left: 15px;
    margin-bottom: 12px;
    cursor: pointer;
    user-select: none;
  }
  
  /* Hide the browser's default radio button */
  label input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
  
  /* Create a custom radio button */
  span {
    position: absolute;
    top: 0;
    left: 0;
    height: 10px;
    width: 10px;
    background-color: ${p => p.theme.colors.text};
    border-radius: 50%;
  }
  
  /* On mouse-over, add a grey background color */
  label:hover input ~ span {
    // background-color: #ccc;
  }
  
  /* When the radio button is checked, add a blue background */
  label input:checked ~ span {
    background-color: ${p => p.theme.colors.text};
  }
  
  label input:checked ~ span:after {
    background-color: ${p => p.theme.colors.accent};
  }
  
  /* Create the indicator (the dot/circle - hidden when not checked) */
  span:after {
    content: "";
    position: absolute;
    display: none;
  }
  
  /* Show the indicator (dot/circle) when checked */
  label input:checked ~ span:after {
    display: block;
  }
  
  /* Style the indicator (dot/circle) */
  label span:after {
    top: 3px;
    left: 2px;
    width: 6px;
    height: 5px;
    border-radius: 50%;
    background: ${p => p.theme.colors.text};
  }
`;

const PositionSquare = styled('div')`
  width: 30px;
  height: 30px;
  display: inline-block;
  vertical-align: top;
  border: 1px solid ${p => p.theme.colors.secondaryBgHover};
  background: ${p => p.clickable ? p.active ? p.theme.colors.accent : p.theme.colors.secondaryBg : p.theme.colors.disabledBg};
  cursor: ${p => p.clickable ? 'pointer' : 'not-allowed'};
  
  ${(p) => {
  if (p.clickable !== 0 && !p.active) {
    return (`
        :hover {
          background: ${p.theme.colors.primaryBg};
        }
      `);
  }
}}
`;

const SelectWatermarkLabel = styled('div')`
  display: inline-block;
  vertical-align: middle;
  margin-left: 20px;
  cursor: pointer;
`;

const Watermarks = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  line-height: 100px;
  background: ${p => p.theme.colors.secondaryBg};
`;

const WatermarkIcon = styled('div')`
  width: 200px;
  height: 70px;
  display: inline-block;
  vertical-align: middle;
  background: ${p => p.theme.colors.primaryBgHover} url(${p => p.src}) 50% 50% / contain no-repeat; 
  margin: 10px;
  padding: 20px;
  border-radius: 4px;
  cursor: pointer;
  
  :hover {
    background-color: ${p => p.theme.colors.secondaryBgHover};
  }
`;


export {
  WatermarkWrapper, WrapperForURL, WrapperForControls, WrapperForOpacity, WatermarkInputs, WatermarkPositionWrapper,
  PositionSquare, SelectWatermarkLabel, Watermarks, WatermarkIcon, WatermarkInputTypes
};