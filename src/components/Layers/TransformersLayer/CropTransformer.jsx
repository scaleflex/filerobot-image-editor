/** External Dependencies */
import React, { useContext, useEffect, useRef } from 'react';
import { Transformer } from 'react-konva';
import Konva from 'konva';

/** Internal Dependencies */
import AppContext from 'context';
import { SET_CROP } from 'actions';
import { CUSTOM_CROP, ELLIPSE_CROP, ORIGINAL_CROP } from 'utils/constants';
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
  } = useContext(AppContext);
  const cropRef = useRef({
    canvasImgDimensions: null,
    tmpPreviewableImgNode: null,
    cropShape: null,
  });
  const cropTransformerRef = useRef();
  const isCustom = crop.ratio === CUSTOM_CROP;
  const isEllipse = crop.ratio === ELLIPSE_CROP;

  const saveCrop = (e) => {
    const width = e.currentTarget.width() / canvasScale; // for removing the scaling from the width;
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
        (isFlippedY ? canvasHeight - y - height : y) -
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
      payload: newCrop,
    });
  };

  const getCropShapeProps = () => {
    const shapeAttrs = cropRef.current?.cropShape?.attrs || {};
    const x = shapeAttrs.x || crop.absoluteX || designLayer.attrs.xPadding || 0;
    const y = shapeAttrs.y || crop.absoluteY || designLayer.attrs.yPadding || 0;
    const width = shapeAttrs.width || crop.width || shownImageDimensions.width;
    const height =
      shapeAttrs.height || crop.height || shownImageDimensions.height;

    return {
      draggable: true,
      fill: '#FFFFFF',
      name: 'crop-shape',
      globalCompositeOperation: 'destination-out',
      x: isFlippedX !== exIsFlipped.x ? canvasWidth - x - width : x,
      y: isFlippedY !== exIsFlipped.y ? canvasHeight - y - height : y,
      width,
      height,
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
    crop.ratio === ORIGINAL_CROP
      ? originalImage.width / originalImage.height
      : crop.ratio;

  const updateCropShapeInTransformer = (newCropShape) => {
    if (cropRef.current?.cropShape) {
      cropRef.current.cropShape.destroy();
    }

    cropRef.current.cropShape = newCropShape;
    cropTransformerRef.current.parent.add(cropRef.current.cropShape);
    cropTransformerRef.current.nodes([cropRef.current.cropShape]);
    cropRef.current.cropShape.moveDown();
    saveCrop({ currentTarget: cropTransformerRef.current });
  };

  const flipPreviewImgNodeIfNeeded = () => {
    const tmpImgNode = cropRef.current.tmpPreviewableImgNode;
    if (isFlippedX) {
      cropRef.current.tmpPreviewableImgNode.scaleX(-1);
      tmpImgNode.x(tmpImgNode.x() + tmpImgNode.width());
    }
    if (isFlippedY) {
      tmpImgNode.scaleY(-1);
      tmpImgNode.y(tmpImgNode.height());
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

      cropRef.current.cropShape.destroy();
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
        Konva.Image.fromURL(originalImage.src, (tmpImgNode) => {
          cropRef.current.tmpPreviewableImgNode = tmpImgNode;
          tmpImgNode.setAttrs(shownImageDimensions);
          tmpImgNode.cache();
          tmpImgNode.filters([Konva.Filters.Blur, Konva.Filters.Brighten]);
          tmpImgNode.blurRadius(10);
          tmpImgNode.brightness(-0.3);
          flipPreviewImgNodeIfNeeded();
          cropTransformerRef.current.parent.add(tmpImgNode);
          cropRef.current.tmpPreviewableImgNode.moveToBottom();
        });
      } else {
        cropRef.current.tmpPreviewableImgNode.setAttrs(shownImageDimensions);
        cropRef.current.cropShape.setAttrs({
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
    if (
      !designLayer ||
      !shownImageDimensions.width ||
      !shownImageDimensions.height ||
      isCustom
    ) {
      return;
    }
    let newRatio = crop.ratio;
    const attrs = getCropShapeProps();

    if (isEllipse) {
      const { width, height, ...newAttrs } = attrs;
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
    } else {
      if (newRatio === ORIGINAL_CROP) {
        newRatio = originalImage.width / originalImage.height;
      }

      const newDimens = boundResizing(
        attrs,
        attrs,
        cropRef.current.canvasImgDimensions,
        newRatio,
      );

      const currentCropShapeAttrs = cropRef.current?.cropShape?.attrs;
      if (
        !currentCropShapeAttrs ||
        currentCropShapeAttrs?.radiusX ||
        currentCropShapeAttrs?.radiusY
      ) {
        const rectCropShape = new Konva.Rect({
          ...attrs,
          x: attrs.x,
          y: attrs.y,
        });
        updateCropShapeInTransformer(rectCropShape);
      } else {
        cropRef.current?.cropShape.setAttrs(newDimens);
        saveCrop({ currentTarget: cropTransformerRef.current });
      }
    }
  }, [designLayer, crop.ratio]);

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
        )
      }
    />
  );
};

export default CropTransformer;
