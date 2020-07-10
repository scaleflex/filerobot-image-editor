import React, { Component } from 'react';
import { PreviewImgBox } from '../../styledComponents';
import ImageManipulator from './ImageManipulator';
import FocusPointPreview from './FocusPointPreview';
import CustomizedCanvas from '../CustomizedCanvas';

export default class extends Component {
  _watermarkUniqueKey = 'watermark-layer';

  componentDidUpdate({ watermark: prevWatermark = {}, logoImage: prevLogoImage}) {
    const { logoImage, watermark = {}, shapeOperations } = this.props;
    const { opacity, url, applyByDefault } = watermark;

    console.log('logo image:', logoImage, 'URL: ', url, 'Apply by def:', applyByDefault, 'Apply watermark: ', prevWatermark.applyByDefault, 'test');
    if (applyByDefault && url && logoImage) {
      if (
          prevLogoImage !== logoImage
          || prevWatermark.opacity !== opacity
        ) {
          console.log('DRAWING FIRST TIME');
          shapeOperations.addImage({ img: logoImage, opacity, type: 'watermark', key: this._watermarkUniqueKey });
      }
    } else if(prevWatermark.applyByDefault && !applyByDefault) {
      console.log(logoImage, url, 'test');
      shapeOperations.deleteShape({ key: this._watermarkUniqueKey });
    } else if(!prevWatermark.applyByDefault && applyByDefault && logoImage && url) {
      shapeOperations.toggleShapeVisibility({ key: this._watermarkUniqueKey });
    }
  }

  render() {
    const {
      activeTab, isHideCanvas, watermark = {}, focusPoint, original, updateState, src, shapes,
    } = this.props;
    const { applyByDefault } = watermark;
    const canvas = window.document.getElementById('scaleflex-image-edit-box');
    const canvasRect = canvas && canvas.getBoundingClientRect() || {};
    
    return (
      <PreviewImgBox
        id="preview-img-box"
        hideCanvas={activeTab === 'crop' || isHideCanvas}
        isShowWatermark={applyByDefault}
      >
        <ImageManipulator {...this.props}/>
        {activeTab !== 'focus_point' &&
        <CustomizedCanvas
          width={canvasRect.width}
          height={canvasRect.height}
          shapes={shapes}
          updateState={updateState}
        />}

        {activeTab === 'focus_point' && (
          <FocusPointPreview
            src={src}
            updateState={updateState}
            focusPoint={focusPoint}
            original={original}
          />
        )}
      </PreviewImgBox>
    )
  }
}