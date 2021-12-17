// TODO: Check maybe we split this file into folder with a file for each function.
/** Internal Dependencies */
import { ELLIPSE_CROP, TOOLS_IDS, WATERMARK_ANNOTATION_ID } from './constants';
import getImageSealingParams from './getImageSealingParams';
import imageToBase64 from './imageToBase64';
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

// const generateRotationQuery = (rotationAngle) => {
//   switch (rotationAngle) {
//     case 90:
//       return `r=270`;
//     case -90:
//       return `r=90`;
//     default:
//       return `r=${rotationAngle}`;
//   }
// };

const generateWatermarkQuery = (
  watermarkAnnotation = {},
  previewDimensions,
) => {
  const { width, height, x, y, opacity, ...watermark } = watermarkAnnotation;
  const queryParams = `wat=1&wat_gravity=absolute&wat_opacity=${opacity}&wat_pos=${toPrecisedFloat(
    (x / previewDimensions.width) * 100,
    2,
  )}p,${toPrecisedFloat((y / previewDimensions.height) * 100, 2)}p`;

  if (watermarkAnnotation.name === TOOLS_IDS.TEXT) {
    return `${queryParams}&wat_text=${watermark.text.replaceAll(
      '\n',
      '',
    )}&wat_font=${watermark.fontFamily}&wat_color=${watermark.fill.replace(
      '#',
      '',
    )}&wat_fontsize=${watermark.fontSize}max`;
  }

  const watermarkUrl = watermark.image.src.startsWith('blob:')
    ? imageToBase64(watermark.image)
    : watermark.image.src;

  return `${queryParams}&wat_url=${watermarkUrl}&wat_scale=${toPrecisedFloat(
    (width / previewDimensions.width) * 100,
    2,
  )}p,${toPrecisedFloat(height / previewDimensions.height, 2)}p`;
};

const finetuneNameToParamInfo = {
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
    adjustments: { crop },
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

  // if (orientationOperation) {
  //   rotationQuery = generateRotationQuery(rotationAngle);
  // }

  if (annotations[WATERMARK_ANNOTATION_ID]) {
    operationsQueries.push(
      generateWatermarkQuery(
        annotations[WATERMARK_ANNOTATION_ID],
        previewDimensions,
      ),
    );
  }

  if (finetunes.length > 0 && finetunesProps) {
    operationsQueries.push(generateFinetuneQuery(finetunes, finetunesProps));
  }

  let paramsStr = operationsQueries.join('&');

  if (imageSealing.enable) {
    paramsStr = getImageSealingParams(paramsStr, imageSealing, imgSrc);
  }
  paramsStr = paramsStr.replaceAll(' ', '+');

  const queryPrefixOperator = imgSrc.indexOf('?') === -1 ? '?' : '&';

  return `${url}${imgSrc}${
    paramsStr ? `${queryPrefixOperator}${paramsStr.replace(/&$/, '')}` : ''
  }`;
};

export default operationsToCloudimageUrl;
