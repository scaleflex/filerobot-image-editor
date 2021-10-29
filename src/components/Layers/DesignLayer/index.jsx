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
import { ELLIPSE_CROP, IMAGE_NODE_ID, TOOLS_IDS } from 'utils/constants';
import { SET_SHOWN_IMAGE_DIMENSIONS } from 'actions';
import getProperImageToCanvasSpacing from 'utils/getProperImageToCanvasSpacing';
import getRotatedImageSize from 'utils/getRotatedImageSize';
import AnnotationNodes from './AnnotationNodes';
import PreviewGroup from './PreviewGroup';

const CANVAS_TO_IMG_SPACING = getProperImageToCanvasSpacing() * 2;

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

  const finetunesAndFilter = useMemo(
    () => (filter ? [...finetunes, filter] : finetunes),
    [finetunes, filter],
  );

  const { originalImgSpacedWidth, originalImgSpacedHeight } = useMemo(() => {
    const spacedWidth = originalImage.width - CANVAS_TO_IMG_SPACING;
    const imgRatio = originalImage.width / originalImage.height;

    return {
      originalImgSpacedWidth: spacedWidth,
      originalImgSpacedHeight: spacedWidth / imgRatio,
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

  const originalImgScaled = useMemo(
    () => ({
      width: originalImgSpacedWidth * originalImgInitialScale,
      height: originalImgSpacedHeight * originalImgInitialScale,
    }),
    [initialCanvasWidth, initialCanvasHeight, originalImgInitialScale],
  );

  const scaleAfterRotation = useMemo(() => {
    const rotatedImgSize = getRotatedImageSize(
      originalImgScaled.width,
      originalImgScaled.height,
      rotation,
    );

    return getDimensionsMinimalRatio(
      originalImgScaled.width,
      originalImgScaled.height,
      rotatedImgSize.width,
      rotatedImgSize.height,
    );
  }, [originalImgScaled, rotation, initialCanvasWidth, initialCanvasHeight]);

  const resizedX = resize.width ? resize.width / originalImage.width : 1;
  const resizedY = resize.height ? resize.height / originalImage.height : 1;

  const xOffsetToCenterImgInCanvas =
    canvasWidth / (2 * canvasScale) - (originalImgScaled.width * resizedX) / 2;

  const yOffsetToCenterImgInCanvas =
    canvasHeight / (2 * canvasScale) -
    (originalImgScaled.height * resizedY) / 2;

  const imageDimensions = useMemo(
    () => ({
      x: xOffsetToCenterImgInCanvas,
      y: yOffsetToCenterImgInCanvas,
      width: originalImgScaled.width,
      height: originalImgScaled.height,
    }),
    [
      xOffsetToCenterImgInCanvas,
      yOffsetToCenterImgInCanvas,
      originalImage,
      originalImgScaled,
    ],
  );

  const clipFunc = (ctx) => {
    const isCurrentlyCropping = toolId === TOOLS_IDS.CROP;
    const clipBox = isCurrentlyCropping
      ? {
          ...imageDimensions,
          x: 0,
          y: 0,
        }
      : {
          width: crop.width || imageDimensions.width,
          height: crop.height || imageDimensions.height,
          x: crop.x ? crop.x - xOffsetToCenterImgInCanvas : 0,
          y: crop.y ? crop.y - yOffsetToCenterImgInCanvas : 0,
        };
    if (crop.ratio === ELLIPSE_CROP && !isCurrentlyCropping) {
      ctx.ellipse(
        clipBox.x + clipBox.width / 2,
        clipBox.y + clipBox.height / 2,
        clipBox.width / 2,
        clipBox.height / 2,
        0,
        0,
        2 * Math.PI,
      );
    } else {
      ctx.rect(clipBox.x, clipBox.y, clipBox.width, clipBox.height);
    }
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
    !xOffsetToCenterImgInCanvas ||
    !yOffsetToCenterImgInCanvas ||
    !imageDimensions
  ) {
    return null;
  }

  const centeredFlippedX =
    (isFlippedX ? originalImgScaled.width : 0) + xOffsetToCenterImgInCanvas;
  const centeredFlippedY =
    (isFlippedY ? originalImgScaled.height : 0) + yOffsetToCenterImgInCanvas;

  return (
    <Layer
      ref={designLayerRef}
      xPadding={xOffsetToCenterImgInCanvas}
      yPadding={yOffsetToCenterImgInCanvas}
      x={centeredFlippedX}
      y={centeredFlippedY}
      scaleX={isFlippedX ? -resizedX : resizedX}
      scaleY={isFlippedY ? -resizedY : resizedY}
      clipFunc={clipFunc}
    >
      <Image
        id={IMAGE_NODE_ID}
        image={originalImage}
        width={originalImgSpacedWidth}
        height={originalImgSpacedHeight}
        scaleX={originalImgInitialScale * scaleAfterRotation}
        scaleY={originalImgInitialScale * scaleAfterRotation}
        offsetX={originalImgSpacedWidth / 2}
        offsetY={originalImgSpacedHeight / 2}
        x={originalImgScaled.width / 2}
        y={originalImgScaled.height / 2}
        rotation={rotation}
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
