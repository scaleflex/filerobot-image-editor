import React, { Component } from 'react';
import { PreviewWrapper, PreviewImgBox } from '../../styledComponents';
import ImageManipulator from './ImageManipulator';
import { Spinner } from '../../../lib/styledComponents';


export default class extends Component {
  render() {
    const { isShowSpinner, activeTab, isHideCanvas } = this.props;

    return (
      <PreviewWrapper>
        <PreviewImgBox id="preview-img-box" hideCanvas={activeTab === 'crop' || isHideCanvas}>
          <ImageManipulator {...this.props}/>
        </PreviewImgBox>
        <Spinner overlay show={isShowSpinner}/>
      </PreviewWrapper>
    )
  }
}