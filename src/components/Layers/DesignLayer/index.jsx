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
import AnnotationNodes from './AnnotationNodes';

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
  } = useContext(AppContext);
  const imageNodeRef = useRef();

  const finetunesAndFilter = useMemo(
    () => (filter ? [...finetunes, filter] : finetunes),
    [finetunes, filter],
  );

  const originalImgInitialScale = useMemo(
    () =>
      getDimensionsMinimalRatio(
        initialCanvasWidth,
        initialCanvasHeight,
        originalImage.width,
        originalImage.height,
      ),
    [initialCanvasWidth, initialCanvasHeight, originalImage],
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

  const xOffsetToCenterImgInCanvas =
    canvasWidth / (2 * canvasScale) -
    (originalImgSpacedWidth * originalImgInitialScale) / 2;

  const yOffsetToCenterImgInCanvas =
    canvasHeight / (2 * canvasScale) -
    (originalImgSpacedHeight * originalImgInitialScale) / 2;

  const imageDimensions = useMemo(
    () => ({
      x: xOffsetToCenterImgInCanvas,
      y: yOffsetToCenterImgInCanvas,
      width: originalImgSpacedWidth * originalImgInitialScale,
      height: originalImgSpacedHeight * originalImgInitialScale,
    }),
    [
      xOffsetToCenterImgInCanvas,
      yOffsetToCenterImgInCanvas,
      originalImage,
      originalImgInitialScale,
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
          designLayer: designLayerRef,
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
      x={xOffsetToCenterImgInCanvas}
      y={yOffsetToCenterImgInCanvas}
      clip={clipBox}
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
    </Layer>
  );
};

export default DesignLayer;
