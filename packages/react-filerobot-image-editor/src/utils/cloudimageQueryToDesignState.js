import Konva from 'konva';
import {
  CLOUDIMG_TO_EDITOR_POSITIONS,
  ELLIPSE_CROP,
  TOOLS_IDS,
  WATERMARK_ANNOTATION_ID,
} from './constants';
import deepMerge from './deepMerge';
import mapNumber from './mapNumber';
import { finetuneNameToParamInfo } from './operationsToCloudimageUrl';

const propertyToOperation = (
  operation,
  value,
  shownImageDimensions = {},
  originalImage = {},
) => {
  const lockCropAreaAt = CLOUDIMG_TO_EDITOR_POSITIONS[value];
  switch (operation) {
    case 'wat_text':
      return { watermark: { text: value.replaceAll('+', ' ') } };
    case 'wat_font':
      return { watermark: { fontFamily: value } };
    case 'wat_color':
      return { watermark: { fill: `#${value}` } };
    case 'wat_fontsize':
      return { watermark: { fontSize: parseFloat(value) } };
    case 'wat_opacity':
      return { watermark: { opacity: parseFloat(value) } };
    case 'wat_pos': {
      const [x, y] = value.split(',');
      return {
        watermark: {
          x: (parseFloat(x) / 100) * shownImageDimensions.width,
          y: (parseFloat(y) / 100) * shownImageDimensions.height,
        },
      };
    }
    case 'wat_url':
      return { watermark: { image: decodeURIComponent(value) } };
    case 'wat_scale': {
      const [scaleX, scaleY] = value.split(',');
      return {
        watermark: {
          width: (parseFloat(scaleX) / 100) * (shownImageDimensions.width || 0),
          height:
            (parseFloat(scaleY) / 100) * (shownImageDimensions.height || 0),
        },
      };
    }
    case 'tl_px': {
      const [x, y] = value.split(',');
      return {
        crop: {
          x: mapNumber(
            parseFloat(x),
            0,
            originalImage.width,
            0,
            shownImageDimensions.width,
          ),
          y: mapNumber(
            parseFloat(y),
            0,
            originalImage.height,
            0,
            shownImageDimensions.height,
          ),
        },
      };
    }
    case 'br_px': {
      const [x, y] = value.split(',');
      return {
        cropX2: mapNumber(
          parseFloat(x),
          0,
          originalImage.width,
          0,
          shownImageDimensions.width,
        ),
        cropY2: mapNumber(
          parseFloat(y),
          0,
          originalImage.height,
          0,
          shownImageDimensions.height,
        ),
      };
    }
    case 'round':
      return {
        crop: {
          ratio: ELLIPSE_CROP,
        },
      };
    case 'gravity':
      return {
        crop: lockCropAreaAt
          ? { lockCropAreaAt, width: null, height: null }
          : {
              noEffect: true,
              ratio: value,
              ratioTitleKey: value,
              width: null,
              height: null,
            },
      };
    case 'aspect_ratio':
      return {
        crop: { ratio: Number(value) },
      };
    case 'w':
      return {
        resize: {
          width: parseFloat(value),
        },
      };
    case 'h': {
      return {
        resize: {
          height: parseFloat(value),
        },
      };
    }
    case 'r': {
      return {
        adjustments: {
          rotation: -parseInt(value, 10),
        },
      };
    }
    case 'flip':
    case 'mirror':
      return {
        adjustments: {
          isFlippedX: value.includes('x') || value.includes('h'),
          isFlippedY: value.includes('y') || value.includes('v'),
        },
      };
    default: {
      let finetuneName;
      Object.keys(finetuneNameToParamInfo).forEach((key) => {
        if (
          finetuneNameToParamInfo[key].cloudimage.name ===
          operation.toLowerCase()
        ) {
          finetuneName = key;
        }
      });

      if (!finetuneName) return null;

      const { cloudimage, internal } = finetuneNameToParamInfo[finetuneName];
      return {
        finetunes: [Konva.Filters[finetuneName]],
        finetunesProps: {
          [internal.propName]: mapNumber(
            parseFloat(value),
            cloudimage.min,
            cloudimage.max,
            internal.min,
            internal.max,
          ),
        },
      };
    }
  }
};

const cloudimageQueryToDesignState = (
  cloudimageQuery,
  shownImageDimensions,
  originalImage,
) => {
  if (!cloudimageQuery) {
    return null;
  }
  const operationsStrings = cloudimageQuery.split('&');
  let designState = {};
  operationsStrings.forEach((operationStr) => {
    const [operation, value] = operationStr.split('=');
    const operationDesignStateObject = propertyToOperation(
      operation,
      value,
      shownImageDimensions,
      originalImage,
    );
    if (operationDesignStateObject) {
      designState = deepMerge(designState, operationDesignStateObject, true);
    }
  });
  const { cropX2, cropY2, crop, watermark, ...unPreparedDesignState } =
    designState;
  const validDesignState = {
    ...unPreparedDesignState,
    ...((cropX2 && cropY2 && crop) || crop?.noEffect || crop?.lockCropAreaAt
      ? {
          adjustments: {
            ...unPreparedDesignState.adjustments,
            crop: {
              width: (cropX2 || 0) - crop.x,
              height: (cropY2 || 0) - crop.y,
              ...crop,
            },
          },
        }
      : {}),
    annotations: {
      ...(watermark
        ? {
            [WATERMARK_ANNOTATION_ID]: {
              ...watermark,
              x: (crop?.x || 0) + (watermark.x || 0),
              y: (crop?.y || 0) + (watermark.y || 0),
              id: WATERMARK_ANNOTATION_ID,
              name: watermark.text ? TOOLS_IDS.TEXT : TOOLS_IDS.IMAGE,
              ...(watermark.text
                ? {
                    width: watermark.text.length * watermark.fontSize,
                    height: watermark.fontSize,
                  }
                : {}),
            },
          }
        : {}),
    },
  };

  return validDesignState;
};

export default cloudimageQueryToDesignState;
