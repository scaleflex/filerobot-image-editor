/** External Dependencies */
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Image, Layer } from 'react-konva';

/** Internal Dependencies */
import getDimensionsMinimalRatio from 'utils/getDimensionsMinimalRatio';
import cropImage from 'utils/cropImage';
import { DESIGN_LAYER_ID, IMAGE_NODE_ID, TOOLS_IDS } from 'utils/constants';
import { SET_SHOWN_IMAGE_DIMENSIONS } from 'actions';
import getProperImageToCanvasSpacing from 'utils/getProperImageToCanvasSpacing';
import { useStore } from 'hooks';
import getSizeAfterRotation from 'utils/getSizeAfterRotation';
import getCenterRotatedPoint from 'utils/getCenterRotatedPoint';
import AnnotationNodes from './AnnotationNodes';
import PreviewGroup from './PreviewGroup';

const CANVAS_TO_IMG_SPACING = getProperImageToCanvasSpacing();

const DesignLayer = () => {
  const designLayerRef = useRef();
  const {
    initialCanvasWidth,
    initialCanvasHeight,
    canvasWidth,
    canvasHeight,
    dispatch,
    toolId,
    canvasScale,
    originalImage = {},
    finetunes = [],
    finetunesProps = {},
    filter = null,
    adjustments: { rotation = 0, crop = {}, isFlippedX, isFlippedY } = {},
    resize,
  } = useStore();
  const imageNodeRef = useRef();
  const previewGroupRef = useRef();
  const isCurrentlyCropping = toolId === TOOLS_IDS.CROP;

  const finetunesAndFilter = useMemo(
    () => (filter ? [...finetunes, filter] : finetunes),
    [finetunes, filter],
  );

  const spacedOriginalImg = useMemo(() => {
    const spacedWidth = originalImage.width - CANVAS_TO_IMG_SPACING;
    const imgRatio = originalImage.width / originalImage.height;

    return {
      width: spacedWidth,
      height: spacedWidth / imgRatio,
    };
  }, [originalImage]);

  const originalImgSizeAfterRotation = useMemo(
    () =>
      getSizeAfterRotation(originalImage.width, originalImage.height, rotation),
    [originalImage, rotation],
  );

  const originalImgInitialScale = useMemo(
    () =>
      getDimensionsMinimalRatio(
        initialCanvasWidth,
        initialCanvasHeight,
        originalImage.width,
        originalImage.height,
      ),
    [originalImage, initialCanvasWidth, initialCanvasHeight],
  );

  const scaledSpacedOriginalImg = useMemo(
    () => ({
      width: spacedOriginalImg.width * originalImgInitialScale,
      height: spacedOriginalImg.height * originalImgInitialScale,
    }),
    [spacedOriginalImg, originalImgInitialScale],
  );

  const resizedX =
    resize.width && !isCurrentlyCropping
      ? resize.width /
        (crop.width ??
          scaledSpacedOriginalImg.width ??
          originalImgSizeAfterRotation.width)
      : 1;
  const resizedY =
    resize.height && !isCurrentlyCropping
      ? resize.height /
        (crop.height ??
          scaledSpacedOriginalImg.height ??
          originalImgSizeAfterRotation.height)
      : 1;

  const xPointToCenterImgInCanvas =
    canvasWidth / (2 * canvasScale) -
    (scaledSpacedOriginalImg.width * resizedX) / 2;

  const yPointToCenterImgInCanvas =
    canvasHeight / (2 * canvasScale) -
    (scaledSpacedOriginalImg.height * resizedY) / 2;

  const xPointNoResizeNoCrop =
    canvasWidth / (2 * canvasScale) - scaledSpacedOriginalImg.width / 2;
  const yPointNoResizeNoCrop =
    canvasHeight / (2 * canvasScale) - scaledSpacedOriginalImg.height / 2;

  const imageDimensions = useMemo(
    () => ({
      x: Math.round(xPointToCenterImgInCanvas),
      y: Math.round(yPointToCenterImgInCanvas),
      abstractX: Math.round(xPointNoResizeNoCrop),
      abstractY: Math.round(yPointNoResizeNoCrop),
      width: scaledSpacedOriginalImg.width,
      height: scaledSpacedOriginalImg.height,
      scaledBy: canvasScale,
    }),
    [
      canvasScale,
      xPointToCenterImgInCanvas,
      yPointToCenterImgInCanvas,
      xPointNoResizeNoCrop,
      yPointNoResizeNoCrop,
      scaledSpacedOriginalImg,
    ],
  );

  const clipFunc = (ctx) => {
    // We are using isSaving to apply ellitpical crop if we're saving the image while in crop tool and it's elliptical crop ratio,
    // As elliptical crop isn't applied while in crop tool.
    const isCroppingAndNotSaving =
      isCurrentlyCropping && !designLayerRef.current?.attrs?.isSaving;
    const clipBox = isCroppingAndNotSaving
      ? {
          ...imageDimensions,
          x: 0,
          y: 0,
        }
      : {
          width: crop.width || imageDimensions.width,
          height: crop.height || imageDimensions.height,
          x: crop.x || 0,
          y: crop.y || 0,
        };
    cropImage(ctx, { ratio: crop.ratio, ...clipBox }, isCroppingAndNotSaving);
    if (designLayerRef.current) {
      designLayerRef.current.setAttrs({
        clipX: clipBox.x,
        clipY: clipBox.y,
        clipWidth: clipBox.width,
        clipHeight: clipBox.height,
      });
    }
  };

  const cacheImageNode = useCallback(() => {
    if (imageNodeRef.current) {
      imageNodeRef.current.cache();
    } else {
      setTimeout(cacheImageNode, 0);
    }
  }, []);

  const sizeAfterRotation = getSizeAfterRotation(
    imageDimensions.width,
    imageDimensions.height,
    rotation,
  );
  const scaleAfterRotation = !isCurrentlyCropping
    ? getDimensionsMinimalRatio(
        imageDimensions.width,
        imageDimensions.height,
        sizeAfterRotation.width,
        sizeAfterRotation.height,
      )
    : 1;

  useEffect(() => {
    if (originalImage) {
      cacheImageNode();
    }

    return () => {
      imageNodeRef.current?.clearCache();
    };
  }, [originalImage]);

  useEffect(() => {
    if (imageDimensions) {
      dispatch({
        type: SET_SHOWN_IMAGE_DIMENSIONS,
        payload: {
          shownImageDimensions: imageDimensions,
          designLayer: designLayerRef.current,
          previewGroup: previewGroupRef.current,
        },
      });
    }
  }, [imageDimensions]);

  if (
    !xPointToCenterImgInCanvas ||
    !yPointToCenterImgInCanvas ||
    !imageDimensions
  ) {
    return null;
  }
  const cropCenterRotatedPoint = getCenterRotatedPoint(
    crop.x,
    crop.y,
    rotation,
  );
  const xPointAfterCrop =
    xPointToCenterImgInCanvas +
    (!isCurrentlyCropping && crop.width
      ? (isFlippedX ? -1 : 1) *
        (imageDimensions.width / 2 -
          crop.x -
          crop.width / 2 +
          cropCenterRotatedPoint.x) *
        resizedX
      : 0);

  const yPointAfterCrop =
    yPointToCenterImgInCanvas +
    (!isCurrentlyCropping && crop.height
      ? (isFlippedY ? -1 : 1) *
        (imageDimensions.height / 2 -
          crop.y -
          crop.height / 2 +
          cropCenterRotatedPoint.y) *
        resizedY
      : 0);

  const xPoint = isCurrentlyCropping ? xPointNoResizeNoCrop : xPointAfterCrop;

  const yPoint = isCurrentlyCropping ? yPointNoResizeNoCrop : yPointAfterCrop;

  const finalScaleX =
    (isFlippedX ? -1 : 1) *
    (isCurrentlyCropping ? 1 : resizedX) *
    scaleAfterRotation;
  const finalScaleY =
    (isFlippedY ? -1 : 1) *
    (isCurrentlyCropping ? 1 : resizedY) *
    scaleAfterRotation;

  return (
    <Layer
      id={DESIGN_LAYER_ID}
      ref={designLayerRef}
      xPadding={xPoint}
      yPadding={yPoint}
      offsetX={scaledSpacedOriginalImg.width / 2}
      offsetY={scaledSpacedOriginalImg.height / 2}
      x={(scaledSpacedOriginalImg.width * resizedX) / 2 + xPoint}
      y={(scaledSpacedOriginalImg.height * resizedY) / 2 + yPoint}
      scaleX={finalScaleX}
      scaleY={finalScaleY}
      rotation={isCurrentlyCropping ? 0 : rotation}
      clipFunc={clipFunc}
    >
      <Image
        id={IMAGE_NODE_ID}
        image={originalImage}
        width={scaledSpacedOriginalImg.width}
        height={scaledSpacedOriginalImg.height}
        offsetX={scaledSpacedOriginalImg.width / 2}
        offsetY={scaledSpacedOriginalImg.height / 2}
        x={scaledSpacedOriginalImg.width / 2}
        y={scaledSpacedOriginalImg.height / 2}
        listening={false}
        filters={finetunesAndFilter}
        ref={imageNodeRef}
        {...finetunesProps}
      />
      <AnnotationNodes />
      <PreviewGroup ref={previewGroupRef} />
    </Layer>
  );
};

export default DesignLayer;
