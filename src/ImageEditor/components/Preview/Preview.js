import React, { Component } from 'react';
import { PreviewWrapper, PreviewImg } from '../../styledComponents';
import ImageManipulator from './ImageManipulator';


export default class extends Component {
  render() {
    return (
      <PreviewWrapper>
        <ImageManipulator/>
        {/*<PreviewImg*/}
          {/*src="//jolipage.api.airstore.io/v1/get/_/9b9443fd-810a-5540-9672-cd911c1c6c40/main_photo_2.jpg"*/}
          {/*alt="Preview image"*/}
        {/*/>*/}
      </PreviewWrapper>
    )
  }
}