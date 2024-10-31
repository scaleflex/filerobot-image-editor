/** External Dependencies */
import { useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

/** Internal Dependencies */
import mapCropBox from 'utils/mapCropBox';
import getProperDimensions from 'utils/getProperDimensions';
import { get, trimVideo } from 'components/Video/services';
import emitCustomEvent from 'utils/emitCustomEvent';
import { EVENTS } from 'utils/constants';
// import extractCurrentDesignState from 'utils/extractCurrentDesignState';
import { SET_FEEDBACK } from 'actions';
import useStore from './useStore';

const useTransformedVideoData = () => {
  const state = useStore();
  const {
    dispatch,
    designLayer,
    shownImageDimensions,
    originalSource,
    resize = {},
    adjustments: { crop = {}, rotation = 0, isFlippedY, isFlippedX } = {},
    config: { useBackendProcess, backendProcess, disableResizeAfterRotation },
  } = state;
  const ffmpegRef = useRef(new FFmpeg());

  const onError = (newError) => {
    dispatch({
      type: SET_FEEDBACK,
      payload: {
        feedback: {
          message: newError.message || newError,
        },
      },
    });
  };

  const getMappedCropBox = () => {
    const { clipWidth, clipHeight, clipX, clipY } = designLayer.attrs;

    return crop.width && crop.height
      ? mapCropBox(
          crop.noEffect
            ? { x: 0, y: 0 }
            : {
                x: crop.x || clipX,
                y: crop.y || clipY,
                width: crop.width || clipWidth,
                height: crop.height || clipHeight,
              },
          shownImageDimensions,
          originalSource,
        )
      : {};
  };

  const load = async () => {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
    const ffmpeg = ffmpegRef.current;

    // for debugging
    // ffmpeg.on('log', ({ type, message }) => {
    //   console.log('message', type, message);
    // });

    ffmpeg.on('progress', ({ progress, time }) => {
      emitCustomEvent(EVENTS.PROCESSING_VIDEO_PROGRESS, {
        progress,
        time,
      });
    });

    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        'application/wasm',
      ),
    });
  };

  const processVideo = async (mappedCropBox) => {
    const ffmpeg = ffmpegRef.current;

    if (!ffmpeg.loaded) {
      await load();
    }

    const videoData = await fetchFile(originalSource.src);

    ffmpeg.writeFile('input.mp4', videoData);

    const finalCommand = ['-i', 'input.mp4'];

    const dimensions =
      originalSource &&
      getProperDimensions(
        resize,
        crop,
        shownImageDimensions,
        disableResizeAfterRotation,
        originalSource,
        rotation,
      );

    const filters = [];

    if (isFlippedX) {
      filters.push('hflip');
    }

    if (isFlippedY) {
      filters.push('vflip');
    }

    if (mappedCropBox.width && mappedCropBox.height) {
      filters.push(
        `crop=${mappedCropBox.width}:${mappedCropBox.height}:${mappedCropBox.x}:${mappedCropBox.y}`,
      );
    }

    if (dimensions?.width && dimensions?.height) {
      filters.push(
        `scale=trunc(${dimensions.width}/2)*2:trunc(${dimensions.height}/2)*2`,
      );
    }

    if (rotation) {
      filters.push(`rotate=${rotation}*PI/180`);
    }

    if (filters.length > 0) {
      finalCommand.push('-vf', filters.join(','));
    }

    await ffmpeg.exec([...finalCommand, '-c:v', 'libx264', 'output.mp4']);
    const data = await ffmpeg.readFile('output.mp4');
    const videoBlob = new Blob([data.buffer], { type: 'video/mp4' });

    return videoBlob;
  };

  const checkVideoStatus = async (response) => {
    if (response?.result[0].progress) {
      const { ready, progress } = await get(
        response?.result[0].progress,
        onError,
      );

      if (!ready && progress >= 0 && progress <= 100) {
        emitCustomEvent(EVENTS.PROCESSING_VIDEO_PROGRESS, {
          progress,
        });
        // eslint-disable-next-line no-promise-executor-return
        await new Promise((resolve) => setTimeout(resolve, 300));
        const status = await checkVideoStatus(response);
        return status;
      }

      if (ready && progress === 100) {
        return response?.result[0]?.trimmed;
      }
    }
  };

  async function getTransformedBackendData(mappedCropBox) {
    const response = await trimVideo({
      key: backendProcess.key,
      token: backendProcess.token,
      url: originalSource.src,
      crop:
        mappedCropBox.width &&
        mappedCropBox.height &&
        [
          mappedCropBox.width,
          mappedCropBox.height,
          mappedCropBox.x,
          mappedCropBox.y,
        ].join(','),
      rotation,
      duration: originalSource.duration,
      onError,
    });

    const url = await checkVideoStatus(response);
    return url;
  }

  const getTransformedVideoData = async (mediaFileInfo) => {
    const mappedCropBox = getMappedCropBox();
    let finalVideoPassedObject = {};
    emitCustomEvent(EVENTS.PROCESSING_VIDEO_START, { file: mediaFileInfo });

    if (
      useBackendProcess &&
      Object.keys(backendProcess).length > 0 &&
      !(isFlippedX || isFlippedY) // until backend supports flip transformation
    ) {
      finalVideoPassedObject.videoUrl = await getTransformedBackendData(
        mappedCropBox,
      );
    } else {
      finalVideoPassedObject.videoBlob = await processVideo(mappedCropBox);
    }

    finalVideoPassedObject = {
      ...finalVideoPassedObject,
      fullName: `${mediaFileInfo.name}.${mediaFileInfo.extension}`,
      name: mediaFileInfo.name,
      extension: mediaFileInfo.extension,
      mimeType: `video/${mediaFileInfo.extension}`,
      width: mediaFileInfo.size.width || mappedCropBox.width,
      height: mediaFileInfo.size.height || mappedCropBox.height,
    };

    // const finalVideoDesignState = {
    //   ...extractCurrentDesignState(state),
    //   shownImageDimensions: {
    //     width: state.shownImageDimensions.width,
    //     height: state.shownImageDimensions.height,
    //     scaledBy: state.shownImageDimensions.scaledBy,
    //   },
    // };

    return {
      data: finalVideoPassedObject,
      // designState: finalVideoDesignState,
    };
  };
  return getTransformedVideoData;
};

export default useTransformedVideoData;
