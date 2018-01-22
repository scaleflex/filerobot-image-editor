import React from 'react';
import styled from 'styled-components';
import { getModalWidth } from '../styleUtils';
import { Aux } from '../hoc';


const ModalOverlay = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  background: #0b0b0b;
  opacity: .4;
  z-index: 1042;
`;

const ModalLayerFixed = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  outline: none!important;
  z-index: 1043;
`;

const ModalContainer = styled.div`
  text-align: center;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  padding: 0 8px;
  box-sizing: border-box;
  
  :before {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
`;

const ModalContent = styled.div`
  width: 100%;
  cursor: auto;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin: 0 auto;
  text-align: left;
  z-index: 1045;
`;

const ModalInner = styled.div`
  max-width: ${getModalWidth};
  margin: 0 auto;
  border-radius: ${props => props.theme.modal.borderRadius};
  background: ${props => props.theme.mainBackgroundColor};
  overflow: hidden;
`;

const ModalFullScreen = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  border-radius: ${props => props.theme.modal.borderRadius};
  background: ${props => props.theme.mainBackgroundColor};
  overflow: hidden;
  z-index: 1045;
  display: block;
  animation: scaleflexFadeInAnimation 350ms ease-in-out both;
  
  @keyframes scaleflexFadeInAnimation {
    from {opacity: 0;}
    to {opacity: 1;}
  }
`;

const Modal = (props) => {
  if (props.fullScreen) {
    return (
      <Aux>
        <ModalOverlay/>
        <ModalFullScreen {...props}>
          {props.children}
        </ModalFullScreen>
      </Aux>
    )
  } else {
    return (
      <Aux>
        <ModalOverlay/>
        <ModalLayerFixed>
          <ModalContainer>
            <ModalContent>
              <ModalInner {...props}>
                {props.children}
              </ModalInner>
            </ModalContent>
          </ModalContainer>
        </ModalLayerFixed>
      </Aux>
    )
  }
}

export { Modal }