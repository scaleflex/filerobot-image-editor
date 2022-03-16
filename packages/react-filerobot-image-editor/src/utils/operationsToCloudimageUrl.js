/** Internal Dependencies */
import { ELLIPSE_CROP, TOOLS_IDS, WATERMARK_ANNOTATION_ID } from './constants';
import getImageSealingParams from './getImageSealingParams';
import mapCropBox from './mapCropBox';
import mapNumber from './mapNumber';
import toPrecisedFloat from './toPrecisedFloat';

const generateCropQuery = (crop, previewDimensions, originalDimensions) => {
  const { x, y, width, height } = mapCropBox(
    crop,
    previewDimensions,
    originalDimensions,
  );

  return `tl_px=${x},${y}&br_px=${x + width},${y + height}${
    crop.ratio === ELLIPSE_CROP
      ? `&radius=${Math.max(width, height)}&force_format=png`
      : ''
  }`;
};

const generateResizeQuery = ({ width, height } = {}) =>
  `w=${width}&h=${height}`;

const generateRotationQuery = (rotationAngle) => `r=${-rotationAngle}`;

const generateFlipQuery = (isFlippedX, isFlippedY) =>
  `flip=${isFlippedX ? 'x' : ''}${isFlippedY ? 'y' : ''}`;

const generateWatermarkQuery = (
  watermarkAnnotation = {},
  previewDimensions,
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
  const scaledWidth = previewDimensions.width * previewDimensions.scaledBy;
  const scaledHeight = previewDimensions.height * previewDimensions.scaledBy;
  const queryParams = `wat=1&wat_gravity=absolute&wat_opacity=${opacity}&wat_pos=${Math.floor(
    ((x - (crop.x || 0)) / scaledWidth) * 100,
    2,
  )}p,${Math.floor(((y - (crop.y || 0)) / scaledHeight) * 100, 2)}p`;

  if (watermarkAnnotation.name === TOOLS_IDS.TEXT) {
    return `${queryParams}&wat_text=${watermark.text.replaceAll(
      '\n',
      '',
    )}&wat_font=${watermark.fontFamily}&wat_color=${watermark.fill.replace(
      '#',
      '',
    )}&wat_fontsize=${watermark.fontSize}max`;
  }

  const imgSrc = watermark.image?.src || watermark.image;
  const watermarkUrl = !imgSrc.startsWith('blob:') && imgSrc;

  return `${queryParams}&wat_scale=${toPrecisedFloat(
    ((width * scaleX) / scaledWidth) * 100,
    2,
  )}p,${toPrecisedFloat(((height * scaleY) / scaledHeight) * 100, 2)}p${
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
      finetuneFn.name && finetuneNameToParamInfo[finetuneFn.name];
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
  originalImage,
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
      generateCropQuery(crop, previewDimensions, originalImage),
    );
  }

  if (resize.width || resize.height) {
    operationsQueries.push(
      generateResizeQuery({ ...originalImage, ...resize }),
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
        annotations[WATERMARK_ANNOTATION_ID],
        previewDimensions,
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
