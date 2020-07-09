import React, { Component } from 'react';
import { PreviewImgBox } from '../../styledComponents';
import ImageManipulator from './ImageManipulator';
import FocusPointPreview from './FocusPointPreview';
import CustomizedCanvas from '../CustomizedCanvas';

export default class extends Component {
  componentDidUpdate({ watermark: prevWatermark = {}, logoImage: prevLogoImage}) {
    const { logoImage, watermark = {}, shapeOperations, shapes } = this.props;
    const { opacity, url, applyByDefault } = watermark;

    if (applyByDefault && url && shapeOperations && logoImage) {
      if (prevLogoImage !== logoImage || prevWatermark.opacity !== opacity) {
        shapeOperations.addImage({ img: logoImage, opacity, type: 'watermark', key: 'watermark' });
      }
    } else if(prevWatermark.applyByDefault && !applyByDefault) {
      shapeOperations.deleteShapesByType('watermark');
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