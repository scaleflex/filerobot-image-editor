import React from 'react';
import styled from 'styled-components';
import { getIconStyles, getIconByName } from './styleUtils';


const Footer = styled.div`
  background: ${props => props.theme.colors.primary.light};
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

const ResetBtn = styled.div`
  ${props => getIconStyles(props)}
  ${getIconByName('reset')}
  
  ${props => getActionIconStyle(props)}
`;

const SwitcherWrapper = styled.div`
  position: relative; 
  display: inline-block;
  vertical-align: middle;
  width: 60px;
  margin-bottom: 2px;
  -webkit-user-select: none; 
  -moz-user-select: none; 
  -ms-user-select: none;
`;

const SwitcherInput = styled.input`
  display: none;
  
  :checked + .onoffswitch-label .onoffswitch-inner {
    margin-left: 0;
}
`;

const SwitcherLabel = styled.label`
  display: block; 
  overflow: hidden; 
  cursor: pointer;
  border: 2px solid #36464d; 
  border-radius: 12px;
  margin: 0;
`;

const SwitcherInner = styled.span`
  display: block; 
  width: 200%; 
  margin-left: ${props => props.checked ? '0' : '-100%'};
  transition: margin 0.3s ease-in 0s;
  
  &:before, &:after {
    display: block; float: left; width: 50%; height: 19px; padding: 0; line-height: 19px;
    font-size: 10px; color: white; font-family: Trebuchet, Arial, sans-serif; font-weight: bold;
    box-sizing: border-box;
  }
  
  &:before {
    content: "ON";
    padding-left: 10px !important;
    background-color: #01717d; 
    color: #FFFFFF;
  }
  
  &:after {
    content: "OFF";
    padding-right: 10px !important;
    background-color: #1e262c; 
    color: #aaaaaa;
    text-align: right;
  }
`;

const SwitcherSwitch = styled.span`
    display: block; 
    width: 10px;
    height: 10px;
    margin: 5.5px;
    background: ${props => props.checked ? '#36464d' : '#36464d'};
    position: absolute; top: 0; bottom: 0;
    right:  ${props => props.checked ? '0' : '37px'};
    border: 2px solid #36464d; 
    border-radius: 12px;
    transition: all 0.3s ease-in 0s;
`;

const SwitcherBlock = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-left: calc(100% - 280px);
`;

const SwitcherText = styled.div`
  margin-left: 8px;
  display: inline-block;
  vertical-align: middle;
  color: #aaaaaa;
  margin-bottom: 3px;
  cursor: pointer;
  cursor: pointer;
`;


const Switcher = ({ id, handleChange, text, checked, ...otherProps }) => (
  <SwitcherBlock>
    <SwitcherWrapper>
      <SwitcherInput
        type="checkbox"
        name={id}
        id={id}
        onChange={() => { handleChange(!checked); }}
        checked={checked}
      />
      <SwitcherLabel htmlFor={id}>
        <SwitcherInner checked={checked}/>
        <SwitcherSwitch checked={checked}/>
      </SwitcherLabel>
    </SwitcherWrapper>
    {text && <SwitcherText onClick={() => { handleChange(!checked); }}>{text}</SwitcherText>}
  </SwitcherBlock>
);

function getActionIconStyle(props) {
  return `
    display: inline-block;
    height: 34px;
    width: 34px;
    cursor: ${props.muted ? 'not-allowed' : 'pointer'};
    text-align: center;
    line-height: 34px;
    border-right: 1px solid ${props.theme.borderDarkColor};
    
    :hover {
      background: ${props.muted ? 'inherit' : props.theme.colors.primary.lighter};
    }
  `;
}

export { Footer, PreviousBtn, NextBtn, ResetBtn, Switcher };