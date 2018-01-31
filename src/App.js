import React, { Component } from 'react';
import ImageEditor from './ImageEditor/components/ImageEditor';
import styled, { injectGlobal, ThemeProvider } from 'styled-components';
import { darkTheme, Modal, Button, Spinner, styleUtils } from 'scaleflex-react-modules/dist';
import { generateUUID } from './ImageEditor/utils';
import 'scaleflex-react-modules/dist/styledComponents/assets/styles/scaleflex-icon-font.css';

class App extends Component {
  state = {
    isLoading: false,
    showModal: false,
    src: '//scaleflex.ultrafast.io/https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/koala.jpg'
  }

  updateSource = src => {
    this.setState({ isLoading: true });
    this.setState({ src: src + `?hash=${generateUUID()}` });
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }

  render() {
    const { showModal, src, isLoading } = this.state;

    return (
      <ThemeProvider theme={darkTheme}>
        <Wrapper>
          <Title>Example of Scaleflex Image Editor</Title>

          <ImageWrapper isLoading={isLoading}>
            <Spinner overlay show={isLoading}/>
            <Img src={src} alt="" onLoad={() => { isLoading && this.setState({ isLoading: false }); }}/>
            <Button onClick={() => { this.setState({ showModal: true }); }}>Edit Image</Button>
          </ImageWrapper>

          <div>
            <Button onClick={() => { this.setState({ showModal: true }); }}>Edit Image</Button>
          </div>

          {showModal &&
          <Modal fullScreen>
            <ImageEditor src={src} onUpdate={this.updateSource} onClose={this.closeModal}/>
          </Modal>}

        </Wrapper>
      </ThemeProvider>
    );
  }
}

export default App;

const Title = styled.h1`
  text-align: center;
  margin: 0;
  padding: 20px;
  background: lightblue;
  color: white;
`;

const Wrapper = styled.div`
  *, *:after, *:before, *::after, *::before {
    box-sizing: border-box;
  }
  *:after, *:before, *::after, *::before {
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
  
  :before {
    content: '';
    display: inline-block;
    vertical-align: middle;
  }
  
  button {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100px;
    height: 30px;
    margin: auto;
  }
  
  :hover button {
    display: block;
  }
`;

const Img = styled.img`

`;

injectGlobal`
  ${styleUtils.getGlobal()}
`;
