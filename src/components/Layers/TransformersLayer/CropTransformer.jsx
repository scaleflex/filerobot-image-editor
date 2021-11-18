/** External Dependencies */
import React, { useContext, useEffect, useRef } from 'react';
import { Transformer } from 'react-konva';
import Konva from 'konva';

/** Internal Dependencies */
import AppContext from 'context';
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

// TODO: Improve this and convert to react-konva.
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
  } = useContext(AppContext);
  const cropConfig = config[TOOLS_IDS.CROP];

  const cropRef = useRef({
    canvasImgDimensions: null,
    tmpPreviewableImgNode: null,
    cropShape: null,
  });
  const cropTransformerRef = useRef();
  const cropRatio = crop.ratio || cropConfig.ratio;
  const isCustom = cropRatio === CUSTOM_CROP;
  const isEllipse = cropRatio === ELLIPSE_CROP;

  const saveCrop = (e, noHistory = false) => {
    if (!e.currentTarget) {
      return;
    }
    const width = e.currentTarget.width() / canvasScale; // for removing the scale from the width;
    const height = e.currentTarget.height() / canvasScale;
    const x = e.currentTarget.x() / canvasScale;
    const y = e.currentTarget.y() / canvasScale;

    const newCrop = {
      absoluteX: isFlippedX && x === crop.x ? canvasWidth - x - width : x,
      absoluteY: isFlippedY && y === crop.y ? canvasHeight - y - height : y,
      relativeX:
        (isFlippedX ? canvasWidth / canvasScale - x - width : x) -
        designLayer.attrs.xPadding,
      relativeY:
        (isFlippedY ? canvasHeight / canvasScale - y - height : y) -
        designLayer.attrs.yPadding,
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

    cropRef.current.cropShape.setAttrs({
      ...newCrop,
      scaleX: 1,
      scaleY: 1,
    });
    dispatch({
      type: SET_CROP,
      payload: {
        ...newCrop,
        dismissHistory: noHistory,
      },
    });
  };

  const getCropShapeProps = (noShapeAttrs = false) => {
    const shapeAttrs = noShapeAttrs
      ? {}
      : cropRef.current?.cropShape?.attrs || {};

    const x = shapeAttrs.x || crop.absoluteX || designLayer.attrs.xPadding || 0;
    const y = shapeAttrs.y || crop.absoluteY || designLayer.attrs.yPadding || 0;
    const width = shapeAttrs.width || crop.width || shownImageDimensions.width;
    const height =
      shapeAttrs.height || crop.height || shownImageDimensions.height;
    const attrs = {
      x: isFlippedX !== exIsFlipped.x ? canvasWidth - x - width : x,
      y: isFlippedY !== exIsFlipped.y ? canvasHeight - y - height : y,
      width,
      height,
    };

    const boundedDimensions = boundResizing(
      attrs,
      attrs,
      cropRef.current.canvasImgDimensions,
      typeof cropRatio === 'string'
        ? originalImage.width / originalImage.height
        : cropRatio,
      cropConfig,
    );

    return {
      ...boundedDimensions,
      draggable: true,
      fill: '#FFFFFF',
      name: 'crop-shape',
      globalCompositeOperation: 'destination-out',
      dragBoundFunc: (pos) =>
        boundDragging(
          {
            ...pos,
            width: cropRef.current.cropShape.width(),
            height: cropRef.current.cropShape.height(),
          },
          cropRef.current.canvasImgDimensions,
        ),
    };
  };

  const getProperCropRatio = () =>
    cropRatio === ORIGINAL_CROP
      ? originalImage.width / originalImage.height
      : cropRatio;

  const updateCropShapeInTransformer = (newCropShape) => {
    if (cropRef.current?.cropShape) {
      cropRef.current.cropShape.destroy();
    }

    const isFirstRender = !cropRef.current.cropShape;
    cropRef.current.cropShape = newCropShape;
    if (cropTransformerRef.current) {
      cropTransformerRef.current.parent.add(cropRef.current.cropShape);
      cropTransformerRef.current.nodes([cropRef.current.cropShape]);
    }
    cropRef.current.cropShape.moveDown();
    saveCrop({ currentTarget: cropTransformerRef.current }, isFirstRender);
  };

  const flipPreviewImgNodeIfNeeded = () => {
    const tmpImgNode = cropRef.current.tmpPreviewableImgNode;
    if (isFlippedX) {
      cropRef.current.tmpPreviewableImgNode.scaleX(-1);
      tmpImgNode.x(tmpImgNode.x() + tmpImgNode.width());
    }
    if (isFlippedY) {
      tmpImgNode.scaleY(-1);
      tmpImgNode.y(tmpImgNode.y() + tmpImgNode.height());
    }
  };

  useEffect(() => {
    if (cropTransformerRef.current && cropRef.current.cropShape) {
      cropTransformerRef.current.parent.add(cropRef.current.cropShape);
      cropRef.current.cropShape.moveDown();
    }

    return () => {
      if (cropRef.current.tmpPreviewableImgNode) {
        cropRef.current.tmpPreviewableImgNode.clearCache();
        cropRef.current.tmpPreviewableImgNode.destroy();
        cropRef.current.tmpPreviewableImgNode = null;
      }

      if (cropRef.current?.cropShape) {
        cropRef.current.cropShape.destroy();
      }

      cropTransformerRef.current = null;
      cropRef.current.cropShape = null;
    };
  }, []);

  useEffect(() => {
    if (
      shownImageDimensions.width &&
      shownImageDimensions.height &&
      shownImageDimensions.x &&
      shownImageDimensions.y &&
      cropTransformerRef.current
    ) {
      if (!cropRef.current.tmpPreviewableImgNode) {
        const tmpImgNode = new Konva.Image({
          image: originalImage,
          x: shownImageDimensions.abstractX,
          y: shownImageDimensions.abstractY,
          width: shownImageDimensions.width,
          height: shownImageDimensions.height,
        });
        cropRef.current.tmpPreviewableImgNode = tmpImgNode;
        tmpImgNode.cache();
        tmpImgNode.filters([Konva.Filters.Blur, Konva.Filters.Brighten]);
        tmpImgNode.blurRadius(10);
        tmpImgNode.brightness(-0.3);
        flipPreviewImgNodeIfNeeded();
        if (cropTransformerRef.current) {
          cropTransformerRef.current.parent.add(tmpImgNode);
        }
        if (cropRef.current) {
          cropRef.current.tmpPreviewableImgNode.moveToBottom();
        }
      } else {
        cropRef.current.tmpPreviewableImgNode.setAttrs({
          x: shownImageDimensions.abstractX,
          y: shownImageDimensions.abstractY,
          width: shownImageDimensions.width,
          height: shownImageDimensions.height,
        });
        cropRef.current?.cropShape?.setAttrs({
          x:
            cropRef.current.cropShape.x() +
            (shownImageDimensions.x - cropRef.current.canvasImgDimensions.x),
          y:
            cropRef.current.cropShape.y() +
            (shownImageDimensions.y - cropRef.current.canvasImgDimensions.y),
        });
        flipPreviewImgNodeIfNeeded();
      }

      cropRef.current.canvasImgDimensions = shownImageDimensions;
    }
  }, [shownImageDimensions]);

  useEffect(() => {
    const currentCropShapeAttrs = cropRef.current?.cropShape?.attrs;
    if (
      !designLayer ||
      !shownImageDimensions.width ||
      !shownImageDimensions.height ||
      (isCustom &&
        !currentCropShapeAttrs?.radiusX &&
        !currentCropShapeAttrs?.radiusY)
    ) {
      return;
    }
    const dimensions = getCropShapeProps();

    if (isEllipse) {
      const { width, height, ...newAttrs } = dimensions;
      const ellipseCropShape = new Konva.Ellipse({
        ...newAttrs,
        radiusX: width / 2,
        radiusY: height / 2,
        offset: {
          x: -width / 2,
          y: -height / 2,
        },
      });

      updateCropShapeInTransformer(ellipseCropShape);
    } else if (
      !currentCropShapeAttrs ||
      currentCropShapeAttrs?.radiusX ||
      currentCropShapeAttrs?.radiusY
    ) {
      const rectCropShape = new Konva.Rect(dimensions);
      updateCropShapeInTransformer(rectCropShape);
    } else {
      cropRef.current?.cropShape.setAttrs(dimensions);
      saveCrop({ currentTarget: cropTransformerRef.current });
    }
  }, [designLayer, cropRatio]);

  useEffect(() => {
    if (cropRef.current?.cropShape) {
      const shapeAttrs = cropRef.current.cropShape.attrs;

      if (
        (!isEllipse &&
          (shapeAttrs.width !== crop.width ||
            shapeAttrs.height !== crop.height)) ||
        (isEllipse &&
          (shapeAttrs.radiusX !== crop.width / 2 ||
            shapeAttrs.radiusY !== crop.height / 2)) ||
        shapeAttrs.absoluteX !== crop.absoluteX ||
        shapeAttrs.absoluteY !== crop.absoluteY
      ) {
        cropRef.current?.cropShape.setAttrs(getCropShapeProps(true));
        saveCrop({ currentTarget: cropRef.current.cropShape }, true);
      }
    }
  }, [crop]);

  const enabledAnchors =
    isCustom || isEllipse
      ? undefined
      : ['top-left', 'bottom-left', 'top-right', 'bottom-right'];

  // ALT is used to center scaling
  return (
    <Transformer
      centeredScaling={false}
      flipEnabled={false}
      rotateEnabled={false}
      nodes={cropRef.current.cropShape ? [cropRef.current.cropShape] : []}
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
      boundBoxFunc={(oldBox, newBox) =>
        boundResizing(
          oldBox,
          newBox,
          cropRef.current.canvasImgDimensions,
          isCustom || isEllipse ? false : getProperCropRatio(),
          cropConfig,
        )
      }
    />
  );
};

export default CropTransformer;
