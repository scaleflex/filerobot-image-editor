/** External Dependencies */
import React, {
  useCallback, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { Button, Select, SwitcherGroup } from '@scaleflex/ui/core';
import Konva from 'konva';

/** Internal Dependencies */
import { AdjustOperationWrapper } from '../Operations.styled';
import { CROP_RATIOS, CUSTOM_CROP_RATIO, ORIGINAL_CROP_RATIO } from '../../../../../utils/constants';
import CropSelectItem from './CropSelectItem';
import boundCropBox from './boundCropBox';

const FIXED_SHAPE_PROPERTIES = {
  draggable: true,
  fill: '#fff',
  name: 'crop-shape',
  opacity: 0.2,
  x: 0,
  y: 0,
};

// TODO: REFACTOR THIS>>>
// props =>> defaultCropWidth, defaultCropHeight, cropMaxWidth = 0, cropMaxHeight = 0, cropMinWidth, cropMinHeight,
const Crop = () => {
  return
  const {
    updateState, designLayer, canvasedImage, adjust = {},
  } = useContext(CanvasContext);
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
        ...dimensions.current,
      },
    },
    {
      min: {
        width: 20,
        height: 20,
      },
      max: {
        x: canvasedImage.width(),
        y: canvasedImage.height(),
        width: 0,
        height: 0,
      },
    },
  ), [cropTransformer, canvasedImage]);

  const enableRoundCrop = useCallback((event) => {
    setIsRoundCrop(event.target.checked);
  }, []);

  const addUpdateCropShape = useCallback(() => {
    const currentCropShape = cropShape.current;
    let shapeProperties = {
      ...FIXED_SHAPE_PROPERTIES,
      dragBoundFunc: (pos) => restrictBox({ current: pos }),
      width: canvasedImage.width(),
      height: canvasedImage.height(),
    };

    if (currentCropShape) {
      currentCropShape.destroy();

      shapeProperties = {
        ...shapeProperties,
        scaleX: currentCropShape.scaleX(),
        scaleY: currentCropShape.scaleY(),
        x: currentCropShape.x(),
        y: currentCropShape.y(),
        width: currentCropShape.width(),
        height: currentCropShape.height(),
      };
    }

    if (isRoundCrop) {
      cropShape.current = new Konva.Ellipse({
        ...shapeProperties,
        offsetX: -shapeProperties.width / 2,
        offsetY: -shapeProperties.height / 2,
      });
    } else {
      cropShape.current = new Konva.Rect(shapeProperties);
    }

    designLayer.add(cropShape.current);
    if (cropTransformer.current) {
      cropTransformer.current.nodes([cropShape.current]);
    }
  }, [canvasedImage, designLayer, isRoundCrop, restrictBox]);

  const addCropTransformer = useCallback(() => {
    if (cropTransformer.current) { cropTransformer.current.destroy(); }

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
      }),
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

  const applyCrop = useCallback(() => {
    updateState(({ adjust }) => ({
      subTab: null,
      adjust: {
        ...adjust,
        crop: {
          ratio: cropRatio,
          isRound: isRoundCrop,
          width: cropTransformer.current?.width(),
          height: cropTransformer.current?.height(),
        },
      },
    }));
  }, [cropRatio, isRoundCrop]);

  useEffect(() => {
    if (canvasedImage && designLayer) {
      addUpdateCropShape();

      if (!cropTransformer.current) {
        addCropTransformer();
      }
    }
  }, [isRoundCrop, canvasedImage, designLayer]);

  useEffect(() => {
    if (cropShape.current && cropTransformer.current) {
      const currCropShape = cropShape.current;
      const currCropTransformer = cropTransformer.current;
      const imgWidth = canvasedImage.width();
      const imgHeight = canvasedImage.height();
      const currScaleX = currCropShape.scaleX();
      const currScaleY = currCropShape.scaleY();

      if (cropRatio >= imgAspectRatio) {
        currCropShape.width(imgWidth * currScaleX);
        currCropShape.height((imgWidth / cropRatio) * currScaleY);
      } else {
        currCropShape.width((imgHeight * cropRatio) * currScaleX);
        currCropShape.height(imgHeight * currScaleY);
      }

      currCropShape.x((imgWidth / 2) - ((currCropShape.width() * currScaleX) / 2));
      currCropShape.y((imgHeight / 2) - ((currCropShape.height() * currScaleY) / 2));

      if (isRoundCrop) {
        currCropShape.offsetX(-currCropShape.width() / 2);
        currCropShape.offsetY(-currCropShape.height() / 2);
      }

      if (isCustomCrop && currCropTransformer.keepRatio()) {
        currCropTransformer.keepRatio(false);
      } else if (!currCropTransformer.keepRatio()) {
        currCropTransformer.keepRatio(true);
      }
    }
  }, [canvasedImage, cropRatio, cropInputValue, isCustomCrop, imgAspectRatio]);

  useEffect(() => () => {
    if (cropTransformer.current) { cropTransformer.current.destroy(); }
    if (cropShape.current) { cropShape.current.destroy(); }
  }, []);

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
      <Button
        color="secondary"
        size="md"
        onClick={applyCrop}
      >
        Apply
      </Button>
    </AdjustOperationWrapper>
  );
};

export default Crop;
