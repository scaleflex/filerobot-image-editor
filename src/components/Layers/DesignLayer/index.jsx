/** External Dependencies */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { Image, Layer } from 'react-konva';

/** Internal Dependencies */
import AppContext from 'context';
import getDimensionsMinimalRatio from 'utils/getDimensionsMinimalRatio';
import cropImage from 'utils/cropImage';
import { DESIGN_LAYER_ID, IMAGE_NODE_ID, TOOLS_IDS } from 'utils/constants';
import { SET_SHOWN_IMAGE_DIMENSIONS } from 'actions';
import getProperImageToCanvasSpacing from 'utils/getProperImageToCanvasSpacing';
import getSizeAfterRotation from 'utils/getSizeAfterRotation';
import AnnotationNodes from './AnnotationNodes';
import PreviewGroup from './PreviewGroup';

const CANVAS_TO_IMG_SPACING = getProperImageToCanvasSpacing();

// TODO: Refactor scaling here as different operations depend on it.
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
  } = useContext(AppContext);
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

  const scaleAfterRotation = useMemo(() => {
    const rotatedImgSize = getSizeAfterRotation(
      scaledSpacedOriginalImg.width,
      scaledSpacedOriginalImg.height,
      rotation,
    );

    return getDimensionsMinimalRatio(
      scaledSpacedOriginalImg.width,
      scaledSpacedOriginalImg.height,
      rotatedImgSize.width,
      rotatedImgSize.height,
    );
  }, [
    scaledSpacedOriginalImg,
    rotation,
    initialCanvasWidth,
    initialCanvasHeight,
  ]);

  const resizedX = resize.width ? resize.width / originalImage.width : 1;
  const resizedY = resize.height ? resize.height / originalImage.height : 1;

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
      x: xPointToCenterImgInCanvas,
      y: yPointToCenterImgInCanvas,
      abstractX: xPointNoResizeNoCrop,
      abstractY: yPointNoResizeNoCrop,
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
    const clipBox = isCurrentlyCropping
      ? {
          ...imageDimensions,
          x: 0,
          y: 0,
        }
      : {
          width: crop.width || imageDimensions.width,
          height: crop.height || imageDimensions.height,
          x: crop.relativeX || 0,
          y: crop.relativeY || 0,
        };
    cropImage(ctx, { ratio: crop.ratio, ...clipBox }, isCurrentlyCropping);
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

  const xPointAfterCrop =
    xPointToCenterImgInCanvas +
    (!isCurrentlyCropping && crop.width
      ? (isFlippedX ? -1 : 1) *
        (imageDimensions.width / 2 - crop.relativeX - crop.width / 2) *
        resizedX
      : 0);

  const yPointAfterCrop =
    yPointToCenterImgInCanvas +
    (!isCurrentlyCropping && crop.height
      ? (isFlippedY ? -1 : 1) *
        (imageDimensions.height / 2 - crop.relativeY - crop.height / 2) *
        resizedY
      : 0);

  const xPoint = isCurrentlyCropping ? xPointNoResizeNoCrop : xPointAfterCrop;

  const yPoint = isCurrentlyCropping ? yPointNoResizeNoCrop : yPointAfterCrop;

  const finalScaleX = isFlippedX ? -resizedX : resizedX;
  const finalScaleY = isFlippedY ? -resizedY : resizedY;
  const defaultScaleX = isFlippedX ? -1 : 1;
  const defaultScaleY = isFlippedY ? -1 : 1;

  return (
    <Layer
      id={DESIGN_LAYER_ID}
      ref={designLayerRef}
      xPadding={xPoint}
      yPadding={yPoint}
      x={
        (isFlippedX ? scaledSpacedOriginalImg.width : 0) *
          (isCurrentlyCropping ? 1 : resizedX) +
        xPoint
      }
      y={
        (isFlippedY ? scaledSpacedOriginalImg.height : 0) *
          (isCurrentlyCropping ? 1 : resizedY) +
        yPoint
      }
      scaleX={isCurrentlyCropping ? defaultScaleX : finalScaleX}
      scaleY={isCurrentlyCropping ? defaultScaleY : finalScaleY}
      clipFunc={clipFunc}
    >
      <Image
        id={IMAGE_NODE_ID}
        image={originalImage}
        width={scaledSpacedOriginalImg.width}
        height={scaledSpacedOriginalImg.height}
        // scaleX={scaleAfterRotation}
        // scaleY={scaleAfterRotation}
        // rotation={rotation}
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
