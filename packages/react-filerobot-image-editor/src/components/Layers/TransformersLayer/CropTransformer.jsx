/** External Dependencies */
import React, { useEffect, useCallback, useRef, useMemo } from 'react';
import { Ellipse, Image, Rect, Line, Transformer } from 'react-konva';
import Konva from 'konva';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { SET_CROP, SET_FEEDBACK } from 'actions';
import {
  CUSTOM_CROP,
  ELLIPSE_CROP,
  FEEDBACK_STATUSES,
  ORIGINAL_CROP,
  TOOLS_IDS,
} from 'utils/constants';
import { boundDragging, boundResizing } from './TransformersLayer.utils';
import TextNode from '../DesignLayer/AnnotationNodes/TextNode';

let isFirstRenderCropUpdated = false;
const noEffectTextDimensions = {
  width: 200,
  height: 100,
};

// properties generator to configure crop guide line components
const makeCropGuideProps =
  (imageDimensions, cropRatio, cropSettings, sx, sy, sw, sh, color) =>
  (ref, HorV, perc) => {
    let attrs = { x: sx, y: sy, width: sw, height: sh };
    attrs = boundResizing(
      attrs,
      attrs,
      { ...imageDimensions, abstractX: 0, abstractY: 0 },
      cropRatio,
      cropSettings,
    );
    const { x, y, width: w, height: h } = attrs;

    const points = [
      HorV === 'V' ? x + (x + w) * perc : x, // left
      HorV === 'V' ? y : y + (y + h) * perc, // top
      HorV === 'V' ? x + (x + w) * perc : x + w, // right
      HorV === 'V' ? y + h : y + (y + h) * perc, // bottom
    ];

    return {
      ref,
      points,
      x: 0,
      y: 0,
      width: 1,
      height: 1,
      fillEnabled: false,
      stroke: color,
      strokeWidth: 1,
      scaleX: 1,
      scaleY: 1,
      draggable: false,
    };
  };

const CropTransformer = () => {
  const {
    dispatch,
    theme,
    designLayer,
    originalImage,
    shownImageDimensions,
    adjustments: { crop = {}, isFlippedX, isFlippedY } = {},
    resize = {},
    config,
    t,
  } = useStore();
  const cropShapeRef = useRef();
  const cropGuideRefVL = useRef();
  const cropGuideRefVC = useRef();
  const cropGuideRefVR = useRef();
  const cropGuideRefHT = useRef();
  const cropGuideRefHC = useRef();
  const cropGuideRefHB = useRef();
  const cropTransformerRef = useRef();
  const tmpImgNodeRef = useRef();
  const shownImageDimensionsRef = useRef();
  const cropConfig = config[TOOLS_IDS.CROP];
  const cropSettings = useMemo(
    () => ({
      ...cropConfig,
      lockCropAreaAt: crop.lockCropAreaAt ?? cropConfig?.lockCropAreaAt,
    }),
    [crop.lockCropAreaAt, cropConfig],
  );
  const { lockCropAreaAt } = cropSettings;
  const cropRatio = crop.ratio || cropSettings.ratio;
  const isCustom = cropRatio === CUSTOM_CROP;
  const isEllipse = cropRatio === ELLIPSE_CROP;

  const affectedNodes = useCallback(
    () =>
      [
        cropShapeRef.current,
        cropGuideRefVL.current,
        cropGuideRefVC.current,
        cropGuideRefVR.current,
        cropGuideRefHT.current,
        cropGuideRefHC.current,
        cropGuideRefHB.current,
      ].filter((v) => v),
    [
      cropShapeRef.current,
      cropGuideRefVL.current,
      cropGuideRefVC.current,
      cropGuideRefVR.current,
      cropGuideRefHT.current,
      cropGuideRefHC.current,
      cropGuideRefHB.current,
    ],
  );

  const guideLineColor = theme.palette['accent-primary'];

  const getProperCropRatio = () =>
    cropRatio === ORIGINAL_CROP
      ? originalImage.width / originalImage.height
      : cropRatio;

  const saveCrop = ({ width, height, x, y }, noHistory) => {
    const newCrop = {
      x: isFlippedX ? shownImageDimensions.width - x - width : x,
      y: isFlippedY ? shownImageDimensions.height - y - height : y,
      width,
      height,
    };

    const isOldCropBiggerThanResize =
      crop.width >= resize.width && crop.height >= resize.height;
    if (
      resize.width &&
      resize.height &&
      (width < resize.width || height < resize.height) &&
      isOldCropBiggerThanResize
    ) {
      dispatch({
        type: SET_FEEDBACK,
        payload: {
          feedback: {
            message: t('cropSizeLowerThanResizedWarning'),
            status: FEEDBACK_STATUSES.WARNING,
          },
        },
      });
    }

    dispatch({
      type: SET_CROP,
      payload: {
        ...crop,
        ...newCrop,
        dismissHistory: noHistory,
      },
    });
  };

  const saveBoundedCropWithLatestConfig = (cropWidth, cropHeight) => {
    if (cropTransformerRef.current && cropShapeRef.current) {
      cropTransformerRef.current.nodes(affectedNodes());
    }

    const imageDimensions = shownImageDimensionsRef.current;

    const attrs = {
      width: cropWidth,
      height: cropHeight,
      x: crop.x ?? 0,
      y: crop.y ?? 0,
    };

    saveCrop(
      boundResizing(
        attrs,
        attrs,
        { ...imageDimensions, abstractX: 0, abstractY: 0 },
        isCustom || isEllipse ? false : getProperCropRatio(),
        cropSettings,
      ),
      true,
    );
  };

  useEffect(() => {
    if (designLayer && cropTransformerRef.current && cropShapeRef.current) {
      if (tmpImgNodeRef.current) {
        tmpImgNodeRef.current.cache();
      }
      cropTransformerRef.current.nodes(affectedNodes());
    }

    return () => {
      if (tmpImgNodeRef.current) {
        tmpImgNodeRef.current.clearCache();
      }
    };
  }, [designLayer, originalImage, shownImageDimensions, affectedNodes()]);

  useEffect(() => {
    if (shownImageDimensionsRef.current) {
      const imageDimensions = shownImageDimensionsRef.current;
      saveBoundedCropWithLatestConfig(
        crop.width ?? imageDimensions.width,
        crop.height ?? imageDimensions.height,
      );
    }
  }, [cropRatio]);

  useEffect(() => {
    if (
      cropTransformerRef.current &&
      cropShapeRef.current &&
      shownImageDimensionsRef.current &&
      crop.width &&
      crop.height
    ) {
      saveBoundedCropWithLatestConfig(crop.width, crop.height);
    }
  }, [cropSettings, shownImageDimensions.width, shownImageDimensions.height]);

  useEffect(() => {
    if (shownImageDimensions) {
      shownImageDimensionsRef.current = shownImageDimensions;
      // Used to fill in the missing crop at the first render incase of custom crop ratio provided from config so we need to apply it
      if (
        !isFirstRenderCropUpdated &&
        cropRatio &&
        shownImageDimensions.x &&
        shownImageDimensions.width
      ) {
        saveBoundedCropWithLatestConfig(
          crop.width ?? shownImageDimensions.width,
          crop.height ?? shownImageDimensions.height,
        );
        isFirstRenderCropUpdated = true;
      }
    }
  }, [shownImageDimensions]);

  if (!designLayer) {
    return null;
  }

  const enabledAnchors =
    ((lockCropAreaAt || crop.noEffect) && []) ||
    (isCustom || isEllipse
      ? undefined
      : ['top-left', 'bottom-left', 'top-right', 'bottom-right']);

  const saveCropFromEvent = (e, noHistory = false) => {
    if (!e.target) {
      return;
    }

    saveCrop(
      {
        width: e.target.width() * e.target.scaleX(),
        height: e.target.height() * e.target.scaleY(),
        x: e.target.x(),
        y: e.target.y(),
      },
      noHistory,
    );
  };

  const limitDragging = (e) => {
    const currentCropShape = e.target;
    currentCropShape.setAttrs(
      boundDragging(currentCropShape.attrs, shownImageDimensionsRef.current),
    );
  };

  let attrs;
  if (!crop.width && !crop.height) {
    const scaleFactor =
      shownImageDimensions.scaledBy < 1 ? shownImageDimensions.scaledBy : 1;
    const unscaledImgDimensions = {
      ...shownImageDimensions,
      width: shownImageDimensions.width / scaleFactor,
      height: shownImageDimensions.height / scaleFactor,
    };
    attrs = boundResizing(
      unscaledImgDimensions,
      { ...unscaledImgDimensions, x: 0, y: 0 },
      { ...unscaledImgDimensions, abstractX: 0, abstractY: 0 },
      isCustom || isEllipse ? false : getProperCropRatio(),
      cropSettings,
    );
  } else {
    attrs = crop;
  }

  let { x = 0, y = 0 } = attrs;
  const { width, height } = attrs;
  x = isFlippedX ? shownImageDimensions.width - x - width : x;
  y = isFlippedY ? shownImageDimensions.height - y - height : y;
  const cropShapeProps = {
    x,
    y,
    ref: cropShapeRef,
    fill: '#FFFFFF',
    scaleX: 1,
    scaleY: 1,
    globalCompositeOperation: 'destination-out',
    onDragEnd: lockCropAreaAt ? undefined : saveCropFromEvent,
    onDragMove: lockCropAreaAt ? undefined : limitDragging,
    onTransformEnd: lockCropAreaAt ? undefined : saveCropFromEvent,
    draggable: !lockCropAreaAt,
  };

  const guideProps = makeCropGuideProps(
    shownImageDimensions,
    getProperCropRatio(),
    cropSettings,
    x,
    y,
    width,
    height,
    guideLineColor,
  );

  // ALT is used to center scaling
  return (
    <>
      <Image
        image={originalImage}
        x={isFlippedX ? shownImageDimensions.width : 0}
        y={isFlippedY ? shownImageDimensions.height : 0}
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
          radiusX={width / 2}
          radiusY={height / 2}
          offset={{
            x: -width / 2,
            y: -height / 2,
          }}
        />
      ) : (
        <>
          <Rect
            {...cropShapeProps}
            width={crop.noEffect ? 0 : width}
            height={crop.noEffect ? 0 : height}
          />
          <Line {...guideProps(cropGuideRefVL, 'V', 0.25)} />
          <Line {...guideProps(cropGuideRefVC, 'V', 0.5)} />
          <Line {...guideProps(cropGuideRefVR, 'V', 0.75)} />
          <Line {...guideProps(cropGuideRefHT, 'H', 0.25)} />
          <Line {...guideProps(cropGuideRefHC, 'H', 0.5)} />
          <Line {...guideProps(cropGuideRefHB, 'H', 0.75)} />
        </>
      )}
      {crop.noEffect && (
        <TextNode
          name="Text"
          id="no-preview-text-node"
          text={t('cropItemNoEffect')}
          x={shownImageDimensions.width / 2 - noEffectTextDimensions.width / 2}
          y={
            shownImageDimensions.height / 2 - noEffectTextDimensions.height / 2
          }
          fontSize={20}
          fill="#ffffff"
          stroke="#ff0000"
          strokeWidth={0.2}
          shadowColor="#ff0000"
          shadowBlur={10}
          annotationEvents={{}}
          align="center"
          width={noEffectTextDimensions.width}
          height={noEffectTextDimensions.height}
        />
      )}
      <Transformer
        centeredScaling={false}
        flipEnabled={false}
        rotateEnabled={false}
        nodes={affectedNodes()}
        anchorSize={12}
        anchorCornerRadius={6}
        enabledAnchors={enabledAnchors}
        ignoreStroke={false}
        anchorStroke={guideLineColor}
        anchorFill={theme.palette['access-primary']}
        anchorStrokeWidth={2}
        borderStroke={guideLineColor}
        borderStrokeWidth={1}
        borderDash={0}
        keepRatio={!isCustom || !isEllipse}
        ref={cropTransformerRef}
        boundBoxFunc={(absOldBox, absNewBox) =>
          boundResizing(
            absOldBox,
            absNewBox,
            shownImageDimensionsRef.current,
            isCustom || isEllipse ? false : getProperCropRatio(),
            cropSettings,
          )
        }
      />
    </>
  );
};

export default CropTransformer;
