import extractNameFromUrl from './extractNameFromUrl';

const loadImage = (imageSrc, imageFileName) =>
  new Promise((resolve, reject) => {
    const imageElement = new Image();
    imageElement.crossOrigin = 'Anonymous';
    imageElement.src = imageSrc;
    imageElement.name = imageFileName ?? extractNameFromUrl(imageSrc);
    imageElement.onload = () => {
      resolve(imageElement);
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
