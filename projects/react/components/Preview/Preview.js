import React, { Component } from 'react';
import { PreviewImgBox } from '../../styledComponents';
import ImageManipulator from './ImageManipulator';
import FocusPointPreview from './FocusPointPreview';
import CustomizedCanvas from '../CustomizedCanvas';
import { WATERMARK_UNIQUE_KEY } from '../../config';

export default class extends Component {
  componentDidUpdate(prevProps) {
    const { logoImage, watermark = {}, shapeOperations, isShowSpinner } = this.props;
    const { opacity, url, applyByDefault, text = {} } = watermark;
    
    // TODO#1: This watermark implemenation should be moved to watermark component...
    // TODO#2: And refactor it there and make it only callable & usable through watermark component..
    // TODO#3: After TODOs #1 & #2, refactoring the text watermark to be added using addText function.
    
    // If the watermark isn't changed and the other effects are not applied yet return;
    // else re-draw the watermark or do the target operation
    if (
        JSON.stringify(prevProps.watermark) == JSON.stringify(watermark)
        && (!prevProps.isShowSpinner || isShowSpinner)
      ) {
        return;
    }

    if (applyByDefault
        && (
            (url && logoImage)
            || (text && text.content)
            )
        ) {
          shapeOperations.addImage({ img: logoImage, opacity, type: 'watermark', key: WATERMARK_UNIQUE_KEY });
    } else {
      if (logoImage && url) {
        shapeOperations.setShapeVisibility({ key: WATERMARK_UNIQUE_KEY }, true);
      } else {
        if (!text.content) {
          shapeOperations.deleteShape({ key: WATERMARK_UNIQUE_KEY });
        }
      }
    }
  }

  render() {
    const {
      activeTab, isHideCanvas, watermark = {}, focusPoint, original, updateState, src, shapes,
      selectedShape, config: { expandShapes = [] }
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
          selectedShape={selectedShape}
          expandShapes={expandShapes}
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