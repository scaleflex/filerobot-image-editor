import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Select, SwitcherGroup } from '@scaleflex/ui/core';
import Konva from 'konva';

import { AdjustOperationWrapper } from '../Operations.styled';
import Context from '../../../../../context';
import { CROP_RATIOS, CUSTOM_CROP_RATIO, ORIGINAL_CROP_RATIO } from '../../../../../utils/constants';
import CropSelectItem from './CropSelectItem';
import boundCropBox from './boundCropBox';

const SHAPE_PROPERTIES = {
  draggable: true,
  fill: '#fff',
  name: 'crop-shape',
  opacity: 0.2,
  x: 0,
  y: 0,
}

// props =>> defaultCropWidth, defaultCropHeight, cropMaxWidth = 0, cropMaxHeight = 0, cropMinWidth, cropMinHeight,
const Crop = () => {
  const { updateState, designLayer, canvasedImage, adjust = {} } = useContext(Context);
  const cropTransformer = useRef(null);
  const cropShape = useRef(null);
  const imgAspectRatio = useMemo(() => canvasedImage.width() / canvasedImage.height(), [canvasedImage]);
  const [cropRatio, setCropRatio] = useState(() => imgAspectRatio);
  const [cropInputValue, setCropInputValue] = useState(CROP_RATIOS[0].value);
  const [isRoundCrop, setIsRoundCrop] = useState(false);
  const isCustomCrop = useMemo(() => cropInputValue === CUSTOM_CROP_RATIO, [cropInputValue]);
  
  const restrictBox = useCallback((dimensions) => boundCropBox(
    {
      ...dimensions,
      current: {
        // box bound contains width & height but drag bound doesn't so it overrides width & height
        width: cropTransformer.current?.width(),
        height: cropTransformer.current?.height(),
        ...dimensions.current
      }
    },
    {
      min: {
        width: 5,
        height: 5,
      },
      max: {
        x: canvasedImage.width(),
        y: canvasedImage.height(),
        width: 0,
        height: 0
      }
    }
  ), [cropTransformer, canvasedImage]);

  const enableRoundCrop = useCallback((event) => {
    setIsRoundCrop(event.target.checked);
  }, []);

  const addCropShape = useCallback(() => {
    cropShape.current = new Konva.Rect({
      ...SHAPE_PROPERTIES,
      dragBoundFunc: (pos) => restrictBox({ current: pos }),
      width: canvasedImage.width(),
      height: canvasedImage.height(),
    });

    designLayer.add(cropShape.current);
  }, [canvasedImage, designLayer, restrictBox]);

  const addCropTransformer = useCallback(() => {
    cropTransformer.current = new Konva.Transformer({
      rotateEnabled: false,
      nodes: [cropShape.current],
      borderStroke: '#fff',
      anchorCornerRadius: 50,
      anchorSize: 17,
      enabledAnchors: ['top-left', 'bottom-left', 'top-right', 'bottom-right'],
      anchorStroke: '#000',
      anchorStrokeWidth: 2,
      borderStrokeWidth: 5,
      keepRatio: true,
      boundBoxFunc: (oldBox, newBox) => restrictBox({
        current: newBox,
        old: oldBox,
        isResizing: true,
        isCustomCrop,
      })
    });

    designLayer.add(cropTransformer.current);
  }, [designLayer, restrictBox, isCustomCrop]);
  
  const changeRatio = useCallback((ratio) => {    
    if (typeof ratio === 'string') {
      if (ratio === ORIGINAL_CROP_RATIO) {
        setCropRatio(imgAspectRatio);
      }
    } else {
      setCropRatio(ratio);
    }
    
    setCropInputValue(ratio);
  }, [imgAspectRatio]);
  
  useEffect(() => {
    if (canvasedImage && designLayer) {
      addCropShape();
      addCropTransformer();
    }

    return () => {
      if (cropTransformer.current) { cropTransformer.current.destroy(); }
      if (cropShape.current) { cropShape.current.destroy(); }
    }
  }, [addCropShape, addCropTransformer, canvasedImage, designLayer]);

  useEffect(() => {
    if (cropShape.current && cropTransformer.current) {
      const currCropShape = cropShape.current;
      const currCropTransformer = cropTransformer.current;
      const imgWidth = canvasedImage.width();
      const imgHeight = canvasedImage.height();

      if (cropRatio >= imgAspectRatio) {
        currCropShape.width(imgWidth);
        currCropShape.height(imgWidth / cropRatio);
      } else {
        currCropShape.width(imgHeight * cropRatio);
        currCropShape.height(imgHeight);
      }

      currCropShape.x((imgWidth / 2) - (currCropShape.width() / 2));
      currCropShape.y((imgHeight / 2) - (currCropShape.height() / 2));

      if (isCustomCrop && currCropTransformer.keepRatio()) {
        currCropTransformer.keepRatio(false);
      } else if (!currCropTransformer.keepRatio()){
        currCropTransformer.keepRatio(true);
      }
    }
  }, [canvasedImage, cropRatio, cropInputValue, isCustomCrop, imgAspectRatio]);

  useEffect(() => {
    if (designLayer && cropShape.current) {
      cropShape.current.destroy();
      const commonShapeProperties = {
        ...SHAPE_PROPERTIES,
        x: cropShape.current.x(),
        y: cropShape.current.y(),
        width: cropShape.current.width(),
        height: cropShape.current.height(),
      };

      if (isRoundCrop) {
        cropShape.current = new Konva.Ellipse({
          ...commonShapeProperties,
          offsetX: -cropShape.current.width() / 2,
          offsetY: -cropShape.current.height() / 2,
        });
      } else {
        cropShape.current = new Konva.Rect(commonShapeProperties);
      }

      designLayer.add(cropShape.current);
      cropTransformer.current.nodes([cropShape.current]);
    }
  }, [designLayer, isRoundCrop]);


  return (
    <AdjustOperationWrapper>
      <Select
        background="primary"
        onChange={changeRatio}
        multiple={false}
        value={cropInputValue}
      >
        {CROP_RATIOS.map(CropSelectItem)}
      </Select>
      <SwitcherGroup
        checked={isRoundCrop}
        label="Round crop"
        onChange={enableRoundCrop}
      />
    </AdjustOperationWrapper>
  );
}

export default Crop;
