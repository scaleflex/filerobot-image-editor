import { ELLIPSE_CROP } from './constants';

const cropImage = (context, cropBox, noEllipticalCrop = false) => {
  if (cropBox.ratio === ELLIPSE_CROP && !noEllipticalCrop) {
    context.ellipse(
      cropBox.x + cropBox.width / 2,
      cropBox.y + cropBox.height / 2,
      cropBox.width / 2,
      cropBox.height / 2,
      0,
      0,
      2 * Math.PI,
    );
  } else {
    context.rect(cropBox.x, cropBox.y, cropBox.width, cropBox.height);
  }
};

export default cropImage;
