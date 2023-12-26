/** External Dependencies */
import React, { useEffect, useRef, useMemo } from 'react';
import { Ellipse, Image, Rect, Transformer } from 'react-konva';
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
      cropTransformerRef.current.nodes([cropShapeRef.current]);
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
      cropTransformerRef.current.nodes([cropShapeRef.current]);
    }

    return () => {
      if (tmpImgNodeRef.current) {
        tmpImgNodeRef.current.clearCache();
      }
    };
  }, [designLayer, originalImage, shownImageDimensions]);

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

  const { x = 0, y = 0, width, height } = attrs;
  const cropShapeProps = {
    x: isFlippedX ? shownImageDimensions.width - x - width : x,
    y: isFlippedY ? shownImageDimensions.height - y - height : y,
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
        <Rect
          {...cropShapeProps}
          width={crop.noEffect ? 0 : width}
          height={crop.noEffect ? 0 : height}
        />
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
