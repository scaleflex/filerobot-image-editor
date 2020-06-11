import React, { Component } from 'react';
import { PreviewImgBox, Watermark } from '../../styledComponents';
import ImageManipulator from './ImageManipulator';
import FocusPointPreview from './FocusPointPreview';
import { getWatermarkPosition } from '../../utils';


export default class extends Component {
  render() {
    const {
      activeTab, isHideCanvas, watermark = {}, logoImage, focusPoint, initialZoom, canvasDimensions, updateState
    } = this.props;
    const { opacity, url, applyByDefault } = watermark;
    const canvas = window.document.getElementById('scaleflex-image-edit-box');
    const canvasRect = canvas && canvas.getBoundingClientRect() || {};
    const [wx, wy, ww, wh] = canvas && logoImage &&
    getWatermarkPosition(watermark, { width: canvasRect.width, height: canvasRect.height }, logoImage) || [];

    return (
      <PreviewImgBox
        id="preview-img-box"
        hideCanvas={activeTab === 'crop' || isHideCanvas}
        isShowWatermark={applyByDefault}
      >
        <ImageManipulator {...this.props}/>
        {applyByDefault && url &&
        <Watermark
          opacity={opacity}
          url={url}
          width={canvasRect.width}
          height={canvasRect.height}
          wx={wx}
          wy={wy}
          ww={ww}
          wh={wh}
        />}

        {activeTab === 'focus_point' && (
          <FocusPointPreview
            updateState={updateState}
            focusPoint={focusPoint}
            canvasRect={canvasRect}
            canvasDimensions={canvasDimensions}
          />
        )}
      </PreviewImgBox>
    )
  }
}