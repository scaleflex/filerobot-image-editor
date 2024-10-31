import { SOURCE_TYPES } from './constants';
import extractNameFromUrl from './extractNameFromUrl';

const loadImage = (imageSrc, options = {}) =>
  new Promise((resolve, reject) => {
    const { noCrossOrigin, name, width, height, key } = options;
    const imageElement = new Image();
    if (!noCrossOrigin) {
      imageElement.crossOrigin = 'Anonymous';
    }
    imageElement.src = imageSrc;
    imageElement.name = name ?? extractNameFromUrl(imageSrc);
    imageElement.key = key;
    imageElement.onload = () => {
      imageElement.width = width || imageElement.width;
      imageElement.height = height || imageElement.height;
      resolve({ newSource: imageElement, type: SOURCE_TYPES.IMAGE });
    };
    imageElement.onerror = () => {
      reject(
        new Error(
          `Error in loading the image with the provided url: ${imageSrc}`,
        ),
      );
    };
  });

export default loadImage;
