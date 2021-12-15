/** External Dependencies */
import React, { useEffect, useRef } from 'react';
import { Ellipse, Image, Rect, Transformer } from 'react-konva';
import Konva from 'konva';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { SET_CROP } from 'actions';
import {
  CUSTOM_CROP,
  ELLIPSE_CROP,
  ORIGINAL_CROP,
  TOOLS_IDS,
} from 'utils/constants';
import { boundDragging, boundResizing } from './cropAreaBounding';

// Used in determining if the current & previous crops are positioned in different (current & previous) flip cases.
const exIsFlipped = {
  x: false,
  y: false,
};

// TODO: Make crop dimensions not changable on change screen size
const CropTransformer = () => {
  const {
    dispatch,
    theme,
    canvasScale,
    designLayer,
    canvasWidth,
    canvasHeight,
    originalImage,
    shownImageDimensions,
    adjustments: { crop = {}, isFlippedX, isFlippedY } = {},
    config,
  } = useStore();
  // abstractX, abstractY = design layer's xPadding, yPadding
  const { abstractX = 0, abstractY = 0 } = shownImageDimensions || {};
  const cropShapeRef = useRef();
  const cropTransformerRef = useRef();
  const tmpImgNodeRef = useRef();
  const shownImageDimensionsRef = useRef(shownImageDimensions);
  const cropConfig = config[TOOLS_IDS.CROP];
  const cropRatio = crop.ratio || cropConfig.ratio;
  const isCustom = cropRatio === CUSTOM_CROP;
  const isEllipse = cropRatio === ELLIPSE_CROP;

  useEffect(() => {
    if (designLayer && cropTransformerRef.current && cropShapeRef.current) {
      if (tmpImgNodeRef.current) {
        tmpImgNodeRef.current.cache();
      }
      cropTransformerRef.current.nodes([cropShapeRef.current]);
    }

    return () => {
      if (tmpImgNodeRef.current) {
        tmpImgNodeRef.current.clearCache();
      }
    };
  }, [designLayer]);

  useEffect(() => {
    if (shownImageDimensions) {
      shownImageDimensionsRef.current = shownImageDimensions;
    }
  }, [shownImageDimensions]);

  useEffect(() => {
    if (cropTransformerRef.current && cropShapeRef.current) {
      cropTransformerRef.current.nodes([cropShapeRef.current]);
    }
  }, [cropRatio]);

  if (!designLayer) {
    return null;
  }

  const enabledAnchors =
    isCustom || isEllipse
      ? undefined
      : ['top-left', 'bottom-left', 'top-right', 'bottom-right'];

  const getProperCropRatio = () =>
    cropRatio === ORIGINAL_CROP
      ? originalImage.width / originalImage.height
      : cropRatio;

  const saveCrop = (e, noHistory = false) => {
    if (!e.currentTarget) {
      return;
    }

    const width = e.currentTarget.width() / canvasScale; // for removing the scale from the width;
    const height = e.currentTarget.height() / canvasScale;
    const x = e.currentTarget.x() - abstractX / canvasScale;
    const y = e.currentTarget.y() - abstractY / canvasScale;

    const newCrop = {
      absoluteX: isFlippedX && x === crop.x ? canvasWidth - x - width : x,
      absoluteY: isFlippedY && y === crop.y ? canvasHeight - y - height : y,
      relativeX: isFlippedX ? canvasWidth / canvasScale - x - width : x,
      relativeY: isFlippedY ? canvasHeight / canvasScale - y - height : y,
      width,
      height,
      ...(isEllipse
        ? {
            offset: {
              x: -width / 2 / canvasScale,
              y: -height / 2 / canvasScale,
            },
          }
        : {}),
    };

    if (isFlippedX !== exIsFlipped.x) {
      exIsFlipped.x = isFlippedX;
    }
    if (isFlippedY !== exIsFlipped.y) {
      exIsFlipped.y = isFlippedY;
    }

    dispatch({
      type: SET_CROP,
      payload: {
        ...newCrop,
        dismissHistory: noHistory,
      },
    });
  };

  const x = (crop.absoluteX || 0) + abstractX;
  const y = (crop.absoluteY || 0) + abstractY;
  const width = crop.width || shownImageDimensions.width;
  const height = crop.height || shownImageDimensions.height;
  const attrs = {
    x: isFlippedX !== exIsFlipped.x ? canvasWidth - x - width : x,
    y: isFlippedY !== exIsFlipped.y ? canvasHeight - y - height : y,
    width,
    height,
  };
  const {
    width: boundedWidth,
    height: boundedHeight,
    ...boundedDimensions
  } = boundResizing(
    cropShapeRef.current?.attrs || attrs,
    attrs,
    shownImageDimensionsRef.current,
    isCustom || isEllipse ? false : getProperCropRatio(),
    cropConfig,
  );
  const cropShapeProps = {
    ...boundedDimensions,
    ref: cropShapeRef,
    fill: '#FFFFFF',
    scaleX: 1,
    scaleY: 1,
    globalCompositeOperation: 'destination-out',
    dragBoundFunc: (pos) =>
      boundDragging(
        {
          ...pos,
          width: cropShapeRef.current.width(),
          height: cropShapeRef.current.height(),
        },
        shownImageDimensionsRef.current,
      ),
  };

  // ALT is used to center scaling
  return (
    <>
      <Image
        image={originalImage}
        x={
          (isFlippedX ? shownImageDimensions.width : 0) +
          shownImageDimensions.abstractX
        }
        y={
          (isFlippedY ? shownImageDimensions.height : 0) +
          shownImageDimensions.abstractY
        }
        width={shownImageDimensions.width}
        height={shownImageDimensions.height}
        filters={[Konva.Filters.Blur, Konva.Filters.Brighten]}
        blurRadius={10}
        brightness={-0.3}
        scaleX={isFlippedX ? -1 : 1}
        scaleY={isFlippedY ? -1 : 1}
        ref={tmpImgNodeRef}
      />
      {isEllipse ? (
        <Ellipse
          {...cropShapeProps}
          radiusX={boundedWidth / 2}
          radiusY={boundedHeight / 2}
          offset={{
            x: -boundedWidth / 2,
            y: -boundedHeight / 2,
          }}
        />
      ) : (
        <Rect {...cropShapeProps} width={boundedWidth} height={boundedHeight} />
      )}
      <Transformer
        centeredScaling={false}
        flipEnabled={false}
        rotateEnabled={false}
        nodes={cropShapeRef.current ? [cropShapeRef.current] : []}
        anchorSize={14}
        anchorCornerRadius={7}
        enabledAnchors={enabledAnchors}
        ignoreStroke={false}
        anchorStroke={theme.palette['accent-primary']}
        anchorFill={theme.palette['access-primary']}
        anchorStrokeWidth={2}
        borderStroke={theme.palette['accent-primary']}
        borderStrokeWidth={2}
        borderDash={[4]}
        keepRatio={!isCustom || !isEllipse}
        ref={cropTransformerRef}
        onTransformEnd={saveCrop}
        onDragEnd={saveCrop}
        shouldOverdrawWholeArea
        boundBoxFunc={(oldBox, newBox) =>
          boundResizing(
            oldBox,
            newBox,
            shownImageDimensionsRef.current,
            isCustom || isEllipse ? false : getProperCropRatio(),
            cropConfig,
          )
        }
      />
    </>
  );
};

export default CropTransformer;
