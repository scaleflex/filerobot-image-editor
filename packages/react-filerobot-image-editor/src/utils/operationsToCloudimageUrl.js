/** Internal Dependencies */
import {
  EDITOR_TO_CLOUDIMG_POSITIONS,
  ELLIPSE_CROP,
  TOOLS_IDS,
  WATERMARK_ANNOTATION_ID,
} from './constants';
import getImageSealingParams from './getImageSealingParams';
import mapCropBox from './mapCropBox';
import mapNumber from './mapNumber';
import rgbaToHexWithOpacity from './rgbaToHexa';
import toPrecisedFloat from './toPrecisedFloat';

const generateCropQuery = ({
  crop,
  previewDimensions,
  originalDimensions,
  cropConfig,
  isFlippedX,
  isFlippedY,
}) => {
  if (crop.noEffect) {
    // if the ratio contains = means it might be a complete crop query (func=face) then use it as it's otherwise assign the ratio to gravity.
    return crop.ratio.includes('=') ? crop.ratio : `gravity=${crop.ratio}`;
  }

  const { lockCropAreaAt } = cropConfig || {};
  const { x, y, width, height } = mapCropBox(
    crop,
    previewDimensions,
    originalDimensions,
  );

  const ellipseQuery =
    crop.ratio === ELLIPSE_CROP
      ? `&radius=${Math.max(width, height)}&force_format=png`
      : '';

  if (lockCropAreaAt) {
    const [yPlace, xPlace] = lockCropAreaAt.split('-');
    const gravity = `${EDITOR_TO_CLOUDIMG_POSITIONS[yPlace]}${EDITOR_TO_CLOUDIMG_POSITIONS[xPlace]}`;
    return `gravity=${gravity}&aspect_ratio=${toPrecisedFloat(
      typeof crop.ratio === 'string' ? width / height : crop.ratio,
      2,
    )}${ellipseQuery}`;
  }

  const tlX = isFlippedX ? originalDimensions.width - (x + width) : x;
  const tlY = isFlippedY ? originalDimensions.height - (y + height) : y;
  return `tl_px=${tlX},${tlY}&br_px=${(isFlippedX ? tlX : x) + width},${
    (isFlippedY ? tlY : y) + height
  }${ellipseQuery}`;
};

const generateResizeQuery = ({ width, height } = {}) =>
  `w=${width}&h=${height}`;

const generateRotationQuery = (rotationAngle) => `r=${-rotationAngle}`;

const generateFlipQuery = (isFlippedX, isFlippedY) =>
  `flip=${isFlippedX ? 'x' : ''}${isFlippedY ? 'y' : ''}`;

const generateWatermarkQuery = (
  originalSource,
  watermarkAnnotation = {},
  crop = {},
) => {
  const {
    width,
    height,
    x,
    y,
    opacity,
    scaleX = 1,
    scaleY = 1,
    ...watermark
  } = watermarkAnnotation;
  const mainImageRatio = originalSource.width / originalSource.height;
  const queryParams = `wat=1&wat_gravity=absolute&wat_pos=${Math.floor(
    ((x - (crop.x || 0)) / originalSource.width) * 100,
    2,
  )}p,${Math.floor(((y - (crop.y || 0)) / originalSource.height) * 100, 2)}p`;

  if (watermarkAnnotation.name === TOOLS_IDS.TEXT) {
    const { hex, opacity: colorOpacity } = rgbaToHexWithOpacity(watermark.fill);
    return `${queryParams}&wat_text=${watermark.text.replaceAll(
      '\n',
      '',
    )}&wat_font=${watermark.fontFamily}&wat_color=${hex}&wat_opacity=${
      colorOpacity ?? opacity ?? 1
    }&wat_fontsize=${watermark.fontSize}max`;
  }

  const imgSrc = watermark.image?.src || watermark.image;
  const watermarkUrl = !imgSrc.startsWith('blob:') && imgSrc;
  const watermarkRatio = width / height;
  const watermarkScale = toPrecisedFloat(
    (watermarkRatio > mainImageRatio
      ? (width * scaleX) / originalSource.width
      : (height * scaleY) / originalSource.height) * 100,
    2,
  );

  return `${queryParams}&wat_opacity=${opacity}&wat_scale=${watermarkScale}p${
    watermarkUrl ? `&wat_url=${encodeURIComponent(watermarkUrl)}` : ''
  }`;
};

export const finetuneNameToParamInfo = {
  Brighten: {
    cloudimage: {
      name: 'bright',
      min: -100,
      max: 100,
    },
    internal: {
      propName: 'brightness',
      min: -1,
      max: 1,
    },
  },
  Contrast: {
    cloudimage: {
      name: 'contrast',
      min: -100,
      max: 100,
    },
    internal: {
      propName: 'contrast',
      min: -100,
      max: 100,
    },
  },
  Blur: {
    cloudimage: {
      name: 'blur',
      min: 0,
      max: 100,
    },
    internal: {
      propName: 'blurRadius',
      min: 0,
      max: 100,
    },
  },
};
const generateFinetuneQuery = (finetunes, finetunesProps = {}) => {
  const queryParams = [];
  finetunes.forEach((finetuneFn) => {
    const finetuneParamInfo =
      (finetuneFn.finetuneName || finetuneFn.name) &&
      finetuneNameToParamInfo[finetuneFn.finetuneName || finetuneFn.name];
    if (finetuneParamInfo) {
      const finetuneCloudimageVal = toPrecisedFloat(
        mapNumber(
          finetunesProps[finetuneParamInfo.internal.propName],
          finetuneParamInfo.internal.min,
          finetuneParamInfo.internal.max,
          finetuneParamInfo.cloudimage.min,
          finetuneParamInfo.cloudimage.max,
        ),
        2,
      );
      queryParams.push(
        `${finetuneParamInfo.cloudimage.name}=${finetuneCloudimageVal}`,
      );
    }
  });

  return queryParams.join('&');
};

const operationsToCloudimageUrl = (
  cloudimage,
  operations,
  previewDimensions,
  originalSource,
  cropConfig,
) => {
  const {
    token,
    domain,
    dontPrefixUrl,
    version,
    imageSealing,
    secureProtocol,
  } = cloudimage;
  const {
    imgSrc,
    adjustments: { crop, rotation, isFlippedX, isFlippedY },
    resize = {},
    finetunes = {},
    finetunesProps,
    annotations = {},
  } = operations;

  const url = !dontPrefixUrl
    ? `http${secureProtocol ? 's' : ''}://${token}.${domain.replace(
        /^(https?:\/\/)?(www\.)?|^\.|\/$/g,
        '',
      )}/${version ? `${version}/` : ''}`
    : '';

  const operationsQueries = [];

  if (
    crop.width &&
    crop.height &&
    (crop.x || crop.x === 0) &&
    (crop.y || crop.y === 0)
  ) {
    operationsQueries.push(
      generateCropQuery({
        crop,
        previewDimensions,
        originalDimensions: originalSource,
        cropConfig,
        isFlippedX,
        isFlippedY,
      }),
    );
  }

  if (resize.width || resize.height) {
    operationsQueries.push(
      generateResizeQuery({
        width: originalSource?.width,
        height: originalSource?.height,
        ...resize,
      }),
    );
  }

  if (rotation) {
    operationsQueries.push(generateRotationQuery(rotation));
  }

  if (isFlippedX || isFlippedY) {
    operationsQueries.push(generateFlipQuery(isFlippedX, isFlippedY));
  }

  if (finetunes.length > 0 && finetunesProps) {
    operationsQueries.push(generateFinetuneQuery(finetunes, finetunesProps));
  }

  if (annotations[WATERMARK_ANNOTATION_ID]) {
    operationsQueries.push(
      generateWatermarkQuery(
        originalSource,
        annotations[WATERMARK_ANNOTATION_ID],
        crop,
      ),
    );
  }

  operationsQueries.push('ci_url_encoded=1');

  let paramsStr = operationsQueries.join('&');

  if (imageSealing.enable) {
    paramsStr = getImageSealingParams(paramsStr, imageSealing, imgSrc);
  }
  paramsStr = paramsStr.replaceAll(' ', '+');

  const queryPrefixOperator =
    (!dontPrefixUrl && '?') || imgSrc.indexOf('?') === -1 ? '?' : '&';

  return `${url}${dontPrefixUrl ? imgSrc : encodeURIComponent(imgSrc)}${
    paramsStr ? `${queryPrefixOperator}${paramsStr.replace(/&$/, '')}` : ''
  }`;
};

export default operationsToCloudimageUrl;
