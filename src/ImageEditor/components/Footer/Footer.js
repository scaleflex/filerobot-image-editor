import React, { Component } from 'react';
import { Footer, PreviousBtn, NextBtn } from '../../styledComponents/index';


export default class extends Component {
  render() {
    return (
      <Footer>
        <PreviousBtn/>
        <NextBtn/>
      </Footer>
    )
  }
}