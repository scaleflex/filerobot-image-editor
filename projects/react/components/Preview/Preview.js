import React, { Component } from 'react';
import { PreviewImgBox } from '../../styledComponents';
import ImageManipulator from './ImageManipulator';
import FocusPointPreview from './FocusPointPreview';
import CustomizedCanvas from '../CustomizedCanvas';
import { getCanvasNode } from '../../utils';

export default class extends Component {
  render() {
    const {
      activeTab, isHideCanvas, watermark = {}, focusPoint, original, updateState, src, shapes,
      selectedShape, config: { expandShapes = [] }, roundCrop, canvasDimensions
    } = this.props;

    const { applyByDefault } = watermark;
    const canvas = getCanvasNode();
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
          selectedShape={selectedShape}
          expandShapes={expandShapes}
          activeTab={activeTab}
          round={roundCrop}
          originalCanvasDimensions={canvasDimensions}
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