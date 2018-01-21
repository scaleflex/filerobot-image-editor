import React, { Component } from 'react';
import { PreviewWrapper } from '../../styledComponents';
import ImageManipulator from './ImageManipulator';


export default class extends Component {
  render() {
    return (
      <PreviewWrapper>
        <ImageManipulator/>
      </PreviewWrapper>
    )
  }
}