/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/** External Dependencies */
import { useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

/** Internal Dependencies */
import mapCropBox from 'utils/mapCropBox';
import getProperDimensions from 'utils/getProperDimensions';
import {
  get,
  transformVideo,
  trimVideo,
} from 'components/VideoEditor/VideoEditor.services';
import emitCustomEvent from 'utils/emitCustomEvent';
import { EVENTS } from 'utils/constants';
// import extractCurrentDesignState from 'utils/extractCurrentDesignState';
import { SET_FEEDBACK } from 'actions';
import loadFfmpeg from 'utils/loadFfmpeg';
import formatSecondsToDuration from 'utils/formatSecondsToDuration';
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
    trim: { segments },
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

  const processVideo = async (mappedCropBox) => {
    const ffmpeg = ffmpegRef.current;

    if (!ffmpeg.loaded) {
      await loadFfmpeg(ffmpeg);
    }

    const videoData = await fetchFile(originalSource.src);
    let fileInputName = 'input.mp4';
    const fileOutputName = 'output.mp4';

    ffmpeg.writeFile(fileInputName, videoData);

    if (segments && segments.length > 0) {
      let concatContent = '';

      for (let i = 0; i < segments.length; i++) {
        const segmentOutput = `segment_${i}.mp4`;
        const { start, end } = segments[i];
        await ffmpeg.exec([
          '-i',
          fileInputName,
          '-ss',
          start.toString(),
          '-to',
          end.toString(),
          '-c:v',
          'libx264',
          '-c:a',
          'aac',
          segmentOutput,
        ]);

        concatContent += `file ${segmentOutput}\n`;
      }

      await ffmpeg.writeFile('concat.txt', concatContent);
      await ffmpeg.exec([
        '-f',
        'concat',
        '-safe',
        '0',
        '-i',
        'concat.txt',
        '-c',
        'copy',
        'concatenated.mp4',
      ]);

      fileInputName = 'concatenated.mp4';
    }

    const finalCommand = ['-i', fileInputName];

    const dimensions =
      originalSource &&
      getProperDimensions({
        resize,
        crop,
        shownImageDimensions,
        disableResizeAfterRotation,
        originalSource,
        rotation,
      });

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

    await ffmpeg.exec([...finalCommand, '-c:v', 'libx264', fileOutputName]);
    if (segments && segments.length > 0) {
      await ffmpeg.deleteFile('concatenated.mp4');
      await ffmpeg.deleteFile('concat.txt');
      for (let i = 0; i < segments.length; i++) {
        await ffmpeg.deleteFile(`segment_${i}.mp4`);
      }
    }

    const data = await ffmpeg.readFile(fileOutputName);
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
        await new Promise((resolve) => {
          setTimeout(resolve, 300);
        });
        const status = await checkVideoStatus(response);
        return status;
      }

      if (ready && progress === 100) {
        return response?.result[0]?.transformed || response?.result[0]?.trimmed;
      }
    }
  };

  const getTimeData = () => {
    return segments
      .map((segment) => {
        return `('${formatSecondsToDuration(
          segment.start,
          true,
        )}','${formatSecondsToDuration(segment.end, true)}')`;
      })
      .join(',');
  };

  const getTransformedBackendData = async (mappedCropBox) => {
    const flip = [];

    if (isFlippedX) {
      flip.push('h');
    }

    if (isFlippedY) {
      flip.push('v');
    }

    const commonProps = {
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
      flip: flip.join(''),
      duration: originalSource.duration,
      onError,
    };

    const response =
      segments.length > 0
        ? await trimVideo({ ...commonProps, trimTimeData: getTimeData() })
        : await transformVideo({ ...commonProps });

    const url = await checkVideoStatus(response);
    return url;
  };

  const getTransformedVideoData = async (mediaFileInfo) => {
    const mappedCropBox = getMappedCropBox();
    let finalVideoPassedObject = {};
    emitCustomEvent(EVENTS.PROCESSING_VIDEO_START, { file: mediaFileInfo });

    if (useBackendProcess && Object.keys(backendProcess).length > 0) {
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

    const finalVideoDesignState = {
      // ...extractCurrentDesignState(state),
      shownImageDimensions: {
        width: state.shownImageDimensions.width,
        height: state.shownImageDimensions.height,
        scaledBy: state.shownImageDimensions.scaledBy,
      },
    };

    return {
      data: finalVideoPassedObject,
      designState: finalVideoDesignState,
    };
  };
  return getTransformedVideoData;
};

export default useTransformedVideoData;
