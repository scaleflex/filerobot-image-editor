import React, { Component } from 'react';
import ImageEditor from 'components/image-editor-react';
import logo from './logo.svg';
import styled from 'styled-components';

const Header = styled.header`
  text-align: center;
  background: blue;
  padding: 20px;
`;

const Image = styled.img`
  width: 140px;
`;


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header>
          <Image src={logo} alt="logo"/>
          <h1 className="App-title">Welcome to React 1</h1>
        </Header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ImageEditor>Super great :)</ImageEditor>
      </div>
    );
  }
}

export default App;
