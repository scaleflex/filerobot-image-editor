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
import { SET_SHOWN_IMAGE_DIMENSIONS } from 'actions';
import getProperImageToCanvasSpacing from 'utils/getProperImageToCanvasSpacing';
import getRotatedImageSize from 'utils/getRotatedImageSize';
import AnnotationNodes from './AnnotationNodes';
import PreviewGroup from './PreviewGroup';

const CANVAS_TO_IMG_BOTH_SIDES_SPACING = getProperImageToCanvasSpacing() * 2;

const DesignLayer = () => {
  const designLayerRef = useRef();
  const {
    initialCanvasWidth,
    initialCanvasHeight,
    canvasWidth,
    canvasHeight,
    dispatch,
    canvasScale,
    originalImage = {},
    finetunes = [],
    finetunesProps = {},
    filter = null,
    adjustments: { rotation = 0 },
  } = useContext(AppContext);
  const imageNodeRef = useRef();
  const previewGroupRef = useRef();

  const finetunesAndFilter = useMemo(
    () => (filter ? [...finetunes, filter] : finetunes),
    [finetunes, filter],
  );

  const { originalImgSpacedWidth, originalImgSpacedHeight } = useMemo(
    () => ({
      originalImgSpacedWidth:
        originalImage.width - CANVAS_TO_IMG_BOTH_SIDES_SPACING,
      originalImgSpacedHeight:
        originalImage.height - CANVAS_TO_IMG_BOTH_SIDES_SPACING,
    }),
    [originalImage],
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

  const xOffsetToCenterImgInCanvas =
    canvasWidth / (2 * canvasScale) - originalImgScaled.width / 2;

  const yOffsetToCenterImgInCanvas =
    canvasHeight / (2 * canvasScale) - originalImgScaled.height / 2;

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

  const clipBox = useMemo(
    () => ({
      ...imageDimensions,
      x: 0,
      y: 0,
    }),
    [imageDimensions],
  );

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
  return (
    <Layer
      ref={designLayerRef}
      rotation={rotation}
      xPadding={xOffsetToCenterImgInCanvas}
      yPadding={yOffsetToCenterImgInCanvas}
      x={xOffsetToCenterImgInCanvas + originalImgScaled.width / 2}
      y={yOffsetToCenterImgInCanvas + originalImgScaled.height / 2}
      clip={clipBox}
      offsetX={originalImgScaled.width / 2}
      offsetY={originalImgScaled.height / 2}
      scaleX={scaleAfterRotation}
      scaleY={scaleAfterRotation}
    >
      <Image
        image={originalImage}
        width={originalImgSpacedWidth}
        height={originalImgSpacedHeight}
        scaleX={originalImgInitialScale}
        scaleY={originalImgInitialScale}
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
