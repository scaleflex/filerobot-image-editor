import React, { Component } from 'react';
import { Wrapper } from '../styledComponents/index';
import { Header, Preview, Footer } from './';


export default class extends Component {
  render() {
    return (
      <Wrapper>

        <Header/>

        <Preview/>

        <Footer/>

      </Wrapper>
    )
  }
}