/** External Dependencies */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Image, Rect } from 'react-konva';

/** Internal Dependencies */
import { useStore } from 'hooks';

const LayersBackground = ({
  width,
  height,
  bgX,
  bgY,
  imageNodeRef,
  customFinetuneProps,
  customFilters,
  originalSourceId,
}) => {
  const {
    originalSource,
    finetunes = [],
    finetunesProps = {},
    filter = null,
    adjustments: { isFlippedX, isFlippedY } = {},
    isSaving,
    previewBgColor,
    previewBgImage,
    config: {
      previewBgColor: configPreviewBgColor,
      previewBgImage: configPreviewBgImage,
    } = {},
  } = useStore();

  const currentPreviewBgColor = previewBgColor || configPreviewBgColor;
  const currentPreviewBgImage = previewBgImage || configPreviewBgImage;

  const finetunesAndFilter = useMemo(
    () => customFilters || (filter ? [...finetunes, filter] : finetunes),
    [customFilters, finetunes, filter],
  );

  const backgroundX = bgX || width / 2;
  const backgroundY = bgY || height / 2;
  const usedFinetuneProps = customFinetuneProps || finetunesProps;
  return (
    <>
      {!isSaving && (currentPreviewBgColor || currentPreviewBgImage) && (
        <Rect
          x={isFlippedX ? width : 0}
          y={isFlippedY ? height : 0}
          fill={currentPreviewBgColor}
          fillPatternImage={currentPreviewBgImage}
          fillPatternRepeat="repeat"
          width={width}
          height={height}
          listening={false}
          scaleX={isFlippedX ? -1 : 1}
          scaleY={isFlippedY ? -1 : 1}
          filters={finetunesAndFilter}
          {...usedFinetuneProps}
        />
      )}
      {originalSource.bgColor && (
        <Rect
          width={width}
          height={height}
          offsetX={backgroundX}
          offsetY={backgroundY}
          x={backgroundX}
          y={backgroundY}
          opacity={originalSource.opacity ?? 1}
          listening={false}
          fill={originalSource.bgColor}
          filters={finetunesAndFilter}
          {...usedFinetuneProps}
        />
      )}
      {originalSource.src && (
        <Image
          id={originalSourceId}
          image={originalSource}
          width={width}
          height={height}
          offsetX={backgroundX}
          offsetY={backgroundY}
          x={backgroundX}
          y={backgroundY}
          listening={false}
          filters={finetunesAndFilter}
          ref={imageNodeRef}
          scaleX={isFlippedX ? -1 : 1}
          scaleY={isFlippedY ? -1 : 1}
          {...usedFinetuneProps}
        />
      )}
    </>
  );
};

LayersBackground.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  imageNodeRef: PropTypes.instanceOf(Object),
  customFilters: PropTypes.instanceOf(Object),
  customFinetuneProps: PropTypes.instanceOf(Object),
  originalSourceId: PropTypes.string,
  bgX: PropTypes.number,
  bgY: PropTypes.number,
};

export default LayersBackground;
