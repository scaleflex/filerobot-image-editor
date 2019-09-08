import React, { Component } from 'react';
import { PreviewImgBox } from '../../styledComponents';
import ImageManipulator from './ImageManipulator';


export default class extends Component {
  render() {
    const { activeTab, isHideCanvas } = this.props;

    return (
      <PreviewImgBox id="preview-img-box" hideCanvas={activeTab === 'crop' || isHideCanvas}>
        <ImageManipulator {...this.props}/>
      </PreviewImgBox>
    )
  }
}