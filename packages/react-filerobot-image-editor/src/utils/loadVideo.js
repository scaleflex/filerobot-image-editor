import extractNameFromUrl from './extractNameFromUrl';
import { SOURCE_TYPES } from './constants';

const loadVideo = (videoSrc, options = {}) =>
  new Promise((resolve, reject) => {
    const { noCrossOrigin, name, width, height, key } = options;

    const videoElement = document.createElement('video');

    if (!noCrossOrigin) {
      videoElement.crossOrigin = 'Anonymous';
    }

    videoElement.src = videoSrc;
    videoElement.name = name ?? extractNameFromUrl(videoSrc);
    videoElement.key = key;
    videoElement.loop = true;

    const load = () => {
      videoElement.width = width || videoElement.videoWidth;
      videoElement.height = height || videoElement.videoHeight;
      videoElement.removeEventListener('loadedmetadata', load);
      resolve({ newSource: videoElement, type: SOURCE_TYPES.VIDEO });
    };

    videoElement.addEventListener('loadedmetadata', load);

    videoElement.onerror = () => {
      reject(
        new Error(
          `Error in loading the video with the provided url: ${videoSrc}`,
        ),
      );
    };
  });

export default loadVideo;
