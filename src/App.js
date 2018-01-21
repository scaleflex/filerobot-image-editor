import React, { Component } from 'react';
import ImageEditor from './ImageEditor/components/ImageEditor';
import styled, { injectGlobal, ThemeProvider } from 'styled-components';
import { darkTheme, Modal } from './lib/styledComponents';


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


class App extends Component {
  render() {
    return (
      <ThemeProvider theme={darkTheme}>
        <Wrapper>
          <Title>Example of Scaleflex Image Editor</Title>

          <Modal fullScreen>
            <ImageEditor/>
          </Modal>
        </Wrapper>
      </ThemeProvider>
    );
  }
}

export default App;

injectGlobal`
  body {
    margin: 0;
  }
`;
