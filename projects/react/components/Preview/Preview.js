import React, { Component } from 'react';
import { PreviewImgBox } from '../../styledComponents';
import ImageManipulator from './ImageManipulator';
import FocusPointPreview from './FocusPointPreview';
import CustomizedCanvas from '../CustomizedCanvas';

export default class extends Component {
  _watermarkUniqueKey = 'watermark-layer';

  componentDidUpdate(prevProps) {
    const { logoImage, watermark = {}, shapeOperations, isShowSpinner } = this.props;
    const { opacity, url, applyByDefault, text = {}, key } = watermark;
    
    // TODO#1: This watermark implemenation should be moved to watermark component...
    // TODO#2: And refactor it there and make it only callable & usable through watermark component..
    // TODO#3: After TODOs #1 & #1, refactoring the text watermark to be added using addText function.
    
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
        console.log('Drawing +++');
        shapeOperations.addImage({ img: logoImage, opacity, type: 'watermark', key: this._watermarkUniqueKey });
    } else {
      if (logoImage && url) {
        console.log('hidding...');
        shapeOperations.setShapeVisibility({ key: this._watermarkUniqueKey }, true);
      } else {
        if (!text.content) {
          console.log('Removing ----');
          shapeOperations.deleteShape({ key: this._watermarkUniqueKey });
        }
      }
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