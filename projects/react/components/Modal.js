import React, { Component, Fragment } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { CloseBtn } from './CloseBtn';
import { variables } from '../styledComponents/styleUtils';
import { MODAL_ID, ON_CLOSE_STATUSES } from '../config';


const ModalOverlay = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  background: ${props => variables.colors.background.base || '#000'};
  opacity: .4;
  z-index: 999999992;
`;


const ModalContent = styled.div`
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  border: ${props => props.noBorder ? 0 : '1px'} solid ${props => props.noBorder ? 'transparent' : variables.colors.border.base || '#B0B0B0'};
  border-radius: ${props => props.noBorder ? 0 : variables.radii[3]};
  overflow: hidden;
  outline: 0;
  height: ${props => props.h || props.height || 'auto'};
  background: ${props => variables.colors.background.base || '#fff'};
  color: ${props => variables.colors.text || '#3d3d3d'};
`;

const ModalFullScreen = styled.div`
  azimuth: center;
  border-collapse: separate;
  border-spacing: 0;
  caption-side: top;
  cursor: auto;
  direction: ltr;
  elevation: level;
  empty-cells: show;
  font-size: medium;
  font-style: medium;
  font-variant: medium;
  font-weight: medium;
  letter-spacing: normal;
  line-height: medium;
  list-style-image: none;
  list-style-position: outside;
  list-style-type: disc;
  list-style: disc outside none;
  orphans: 2;
  pitch-range: 50;
  pitch: medium;
  quotes: '"' '"';
  richness: 50;
  speak-header: once;
  speak-numeral: continuous;
  speak-punctuation: none;
  speak: normal;
  speech-rate: medium;
  stress: 50;
  text-align: left;
  text-indent: 0;
  text-transform: none;
  visibility: visible;
  voice-family: none;
  volume: medium;
  white-space: normal;
  widows: 2;
  word-spacing: 0;
  position: fixed;
  padding: ${props => props.p || props.padding || '0'};
  top: 5%;
  left: 15%;
  right: 15%;
  bottom: 5%;
  color: ${props => variables.colors.text || '#3d3d3d'};
  overflow: hidden;
  z-index: ${props => props.zIndex || '999999995'};
  display: block;
  animation: scaleflexFadeInAnimation 350ms ease-in-out both;
  font-family: 'Roboto', 'Arial', sans-serif;
  
  ${props => props.isTooSmall ? getSmallModalStyle() : ''};
  
  @keyframes scaleflexFadeInAnimation {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  
  @media (max-width: 1000px) {
    top: 20px;
    left: 20px;
    bottom: 20px;
    right: 20px;
  }
`;

function getSmallModalStyle() {
  return `
    top: 20% !important;
    left: 15px !important;
    right: 15px !important;
    bottom: auto !important;
    color: black !important;
    text-align: center !important;
    font-size: 18px;
    
    > div {
      padding: 40px !important;
    }
    
    * {
      color: black !important;
    }
  `
}

export class Modal extends Component {
  UNSAFE_componentWillMount() {
    const { closeOnOutsideClick = true } =  this.props;
    this.root = document.createElement('div');
    document.body.appendChild(this.root);

    if (closeOnOutsideClick) {
      document.addEventListener('keydown', this.handleOutsideMouseClick);
    }
  }

  componentWillUnmount() {
    const { closeOnOutsideClick = true } =  this.props;
    document.body.removeChild(this.root);

    if (closeOnOutsideClick) {
      document.removeEventListener('keydown', this.handleOutsideMouseClick);
    }
  }
  //todo add keycode to config
  handleOutsideMouseClick = event => {
    let { onClose = () => {} } = this.props;

    if (event.keyCode === 27) {
      event.stopPropagation();
      onClose(ON_CLOSE_STATUSES.ESC_KEY_PRESSED);
    }
  }

  render() {
    let { onClose = () => {}, isHideCloseBtn, ...otherProps } = this.props;

    return createPortal(
      <Fragment>
        <ModalOverlay onClick={() => onClose(ON_CLOSE_STATUSES.MODAL_OVERLAY_CLICKED)}/>
        <ModalFullScreen id={MODAL_ID} {...this.props}>
          {!isHideCloseBtn && <CloseBtn onClick={onClose}/>}
          <ModalContent h="100%" {...otherProps}>
            {this.props.children}
          </ModalContent>
        </ModalFullScreen>
      </Fragment>, this.root
    )
  }
}