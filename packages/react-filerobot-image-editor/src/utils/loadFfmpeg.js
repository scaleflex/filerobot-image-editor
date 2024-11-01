/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/** External Dependencies */
import { toBlobURL } from '@ffmpeg/util';

/** Internal Dependencies */
import { EVENTS } from 'utils/constants';
import emitCustomEvent from 'utils/emitCustomEvent';
// // TODO: check with vanilla js build
// import ffmpegJs from '../libraries/ffmpeg/ffmpeg-core.js?url';
// import ffmpegWasm from '../libraries/ffmpeg/ffmpeg-core.wasm?url';

const loadFfmpeg = async (ffmpegRef) => {
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
  // for debugging
  // ffmpeg.on('log', ({ type, message }) => {
  //   console.log('message', type, message);
  // });

  ffmpegRef.on('progress', ({ progress, time }) => {
    emitCustomEvent(EVENTS.PROCESSING_VIDEO_PROGRESS, {
      progress,
      time,
    });
  });

  await ffmpegRef.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  });
};

export default loadFfmpeg;
