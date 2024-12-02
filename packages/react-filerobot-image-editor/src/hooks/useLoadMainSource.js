/** External Dependencies */
import { useCallback, useEffect, useRef } from 'react';

/** Internal Dependencies */
import {
  HIDE_LOADER,
  RESET,
  SET_FEEDBACK,
  SET_ORIGINAL_SOURCE,
  SHOW_LOADER,
  UPDATE_STATE,
} from 'actions';
import loadImage from 'utils/loadImage';
import loadVideo from 'utils/loadVideo';
import {
  useResizeObserver,
  useStore,
  useTransformedImgData,
  useUpdateEffect,
} from 'hooks';
import { getBackendTranslations } from 'utils/translator';
import finetunesStrsToClasses from 'utils/finetunesStrsToClasses';
import filterStrToClass from 'utils/filterStrToClass';
import isSameSource from 'utils/isSameSource';
import cloudimageQueryToDesignState from 'utils/cloudimageQueryToDesignState';
import { DEFAULT_ZOOM_FACTOR, SOURCE_TYPES } from 'utils/constants';
import isImageExtension from 'utils/isImageExtension';
import isVideoExtension from 'utils/isVideoExtension';
import isBlobFile from 'utils/isBlobFile';
import isImage from 'utils/isImage';
import useTransformedVideoData from './useTransformedVideoData';

const getSourceTypeByExtension = (url) => {
  if (isImageExtension(url)) {
    return SOURCE_TYPES.IMAGE;
  }

  if (isVideoExtension(url)) {
    return SOURCE_TYPES.VIDEO;
  }
};

const useLoadMainSource = ({
  sourceToLoad,
  onPluginRootResize,
  pluginRootRef,
  resetOnSourceChange: triggerResetOnSourceChange,
  keepZoomOnSourceChange: zoomKeptOnSourceChange,
} = {}) => {
  const {
    config,
    haveNotSavedChanges,
    dispatch,
    originalSource,
    shownImageDimensions,
    t,
    sourceType,
  } = useStore();
  const {
    useCloudimage,
    cloudimage,
    loadableDesignState,
    source: configSource,
    avoidChangesNotSavedAlertOnLeave,
    useBackendTranslations,
    translations,
    language,
    defaultSavedMediaName,
    observePluginContainerSize,
    getCurrentMediaDataFnRef,
    updateStateFnRef,
    noCrossOrigin,
    resetOnSourceChange: configResetOnSourceChange,
    keepZoomOnSourceChange: configKeepZoomOnSourceChange,
  } = config;
  const source = sourceToLoad || configSource;
  const resetOnSourceChange =
    triggerResetOnSourceChange ?? configResetOnSourceChange;
  const keepZoomOnSourceChange =
    zoomKeptOnSourceChange ?? configKeepZoomOnSourceChange;

  const [observeResize, unobserveElement] = useResizeObserver();
  const cloudimageQueryLoaded = useRef(false);
  const imageBeingLoadedSrc = useRef(null);
  // Hacky solution, For being used in beforeunload event
  // as it won't be possible to have the latest value of the state variable in js event handler.
  const haveNotSavedChangesRef = useRef(haveNotSavedChanges);
  const transformImgFn = useTransformedImgData();
  const transformVideoFn = useTransformedVideoData();

  const setNewOriginalSource = useCallback(
    ({ newSource, type } = {}) => {
      dispatch({
        type: SET_ORIGINAL_SOURCE,
        payload: {
          originalSource: newSource || {},
          sourceType: type,
          ...(!(resetOnSourceChange || keepZoomOnSourceChange) && {
            zoom: {
              factor: DEFAULT_ZOOM_FACTOR,
              x: null,
              y: null,
            },
          }),
        },
      });
    },
    [resetOnSourceChange, keepZoomOnSourceChange],
  );

  const setOriginalSourceIfDimensionsFound = (newSource) => {
    if (newSource?.width && newSource.height) {
      const newSourceClone = { ...newSource };
      delete newSourceClone.src;
      setNewOriginalSource({ newSource: newSourceClone });
      return true;
    }

    return false;
  };

  const setError = useCallback((newError) => {
    dispatch({
      type: SET_FEEDBACK,
      payload: {
        feedback: {
          message: newError.message || newError,
          duration: 0,
        },
      },
    });
  }, []);

  const getUrl = (mediaToLoad) =>
    isBlobFile(mediaToLoad)
      ? URL.createObjectURL(mediaToLoad)
      : mediaToLoad?.src || mediaToLoad;

  const getContentType = async (mediaToLoad, url) => {
    if (isBlobFile(mediaToLoad)) {
      return mediaToLoad.type;
    }
    const response = await fetch(url, { method: 'HEAD' });
    if (response.ok) {
      return response.headers.get('content-type');
    }
  };

  const getSourceData = async (mediaToLoad) => {
    let url = '';
    try {
      url = getUrl(mediaToLoad);
      const contentType = await getContentType(mediaToLoad, url);

      if (contentType.startsWith('image/')) {
        return { sourceUrl: url, sourceType: SOURCE_TYPES.IMAGE };
      }

      if (contentType.startsWith('video/')) {
        return { sourceUrl: url, sourceType: SOURCE_TYPES.VIDEO };
      }

      return {
        sourceUrl: url,
        sourceType: getSourceTypeByExtension(url),
      };
    } catch (error) {
      setError(error);
      return {
        sourceUrl: url,
        sourceType: getSourceTypeByExtension(url),
      };
    }
  };

  const loadMedia = async (mediaToLoad) => {
    const { sourceUrl, sourceType: mediaType } = await getSourceData(
      mediaToLoad,
    );
    const options = {
      name: mediaToLoad?.name || defaultSavedMediaName,
      noCrossOrigin,
      width: mediaToLoad?.width,
      height: mediaToLoad?.height,
      key: mediaToLoad?.key,
    };

    if (mediaType === SOURCE_TYPES.IMAGE && sourceUrl) {
      return loadImage(sourceUrl, options);
    }

    if (mediaType === SOURCE_TYPES.VIDEO && sourceUrl) {
      return loadVideo(sourceUrl, options);
    }

    return Promise.reject(t('mediaSourceError'));
  };
  // We are promisifying the image loading for mixing it with other promises
  const loadAndSetOriginalSource = (imgToLoad) =>
    new Promise((resolve) => {
      const imgSrc = imgToLoad?.src || imgToLoad;
      if (
        imageBeingLoadedSrc.current === imgSrc ||
        (!imgSrc && originalSource) ||
        isSameSource(imgSrc, originalSource)
      ) {
        if (!imageBeingLoadedSrc.current) {
          resolve();
        }
        return;
      }

      const triggerResolve = () => {
        imageBeingLoadedSrc.current = null;
        resolve();
      };

      imageBeingLoadedSrc.current = imgSrc;

      // This timeout is a workaround when re-initializing
      // the react app from vanilla JS. Due to a bug in react
      // the dispatch method that is called in setNewOriginalSource
      // still points to the old dispatch method after re-init,
      // so we need to wait for one tick to make sure it's updated.
      //
      // This applies to both URLs and HTMLImageElement, since URLs
      // may resolve immediately in some cases, e.g. memory cache.
      setTimeout(() => {
        if (imgToLoad instanceof HTMLImageElement) {
          if (!imgToLoad.name && defaultSavedMediaName) {
            // eslint-disable-next-line no-param-reassign
            imgToLoad.name = defaultSavedMediaName;
          }
          if (!imgToLoad.complete) {
            imgToLoad.addEventListener('load', () => {
              setNewOriginalSource({ newSource: imgToLoad });
              triggerResolve();
            });
            return;
          }

          setNewOriginalSource({ newSource: imgToLoad });
          triggerResolve();
        } else if (
          imgToLoad &&
          (typeof imgToLoad === 'string' ||
            imgToLoad instanceof Blob ||
            imgToLoad?.src)
        ) {
          loadMedia(imgToLoad?.src || imgToLoad, {
            name: defaultSavedMediaName,
            noCrossOrigin,
            width: imgToLoad?.width,
            height: imgToLoad?.height,
            key: imgToLoad?.key,
          })
            .then(setNewOriginalSource)
            .catch((err) => {
              if (!setOriginalSourceIfDimensionsFound(imgToLoad)) {
                setError(err);
              }
            })
            .finally(triggerResolve);
        } else if (setOriginalSourceIfDimensionsFound(imgToLoad)) {
          triggerResolve();
        } else {
          setError(t('invalidImageError'));
          triggerResolve();
        }
      }, 0);
    });

  const promptDialogIfHasChangeNotSaved = (e) => {
    if (haveNotSavedChangesRef.current) {
      e.preventDefault();
      e.returnValue = '';
    }
  };

  // loadingPromisesFn is a function for enabling the ability to show loader first then trigger requests not vice versa.
  const handleLoading = (loadingPromisesFn = () => []) => {
    dispatch({ type: SHOW_LOADER });

    return Promise.all(loadingPromisesFn())
      .catch(() => {})
      .finally(() => {
        setTimeout(() => dispatch({ type: HIDE_LOADER }), 0);
      });
  };

  const updateDesignStateWithLoadableOne = () => {
    if (loadableDesignState && Object.keys(loadableDesignState).length > 0) {
      dispatch({
        type: UPDATE_STATE,
        payload: {
          ...loadableDesignState,
          finetunes: finetunesStrsToClasses(loadableDesignState?.finetunes),
          filter: filterStrToClass(loadableDesignState?.filter),
        },
      });
    }
  };

  useUpdateEffect(() => {
    if (source && !isSameSource(source, originalSource)) {
      cloudimageQueryLoaded.current = false;
      const isSrcLinkNotChanged =
        (typeof originalSource?.src === 'undefined' &&
          typeof source?.src === 'undefined' &&
          typeof source !== 'string') ||
        (source?.src || source) === originalSource?.src;

      // Don't show the spinner as it is not really needed in-case we are changing the width/height...etc. to avoid giving a feeling of jumping effect.
      if (isSrcLinkNotChanged) {
        loadAndSetOriginalSource(source);
      } else {
        handleLoading(() => [loadAndSetOriginalSource(source)]);
      }

      if (resetOnSourceChange) {
        dispatch({
          type: RESET,
          payload: { config },
        });
      }
    }
  }, [source]);

  // TODO: To be checked if still needed?.
  useUpdateEffect(() => {
    const newImgSrc = loadableDesignState?.imgSrc;
    if (newImgSrc && !isSameSource(newImgSrc, originalSource)) {
      handleLoading(() => [
        loadAndSetOriginalSource(newImgSrc).then(
          updateDesignStateWithLoadableOne,
        ),
      ]);
    } else {
      updateDesignStateWithLoadableOne();
    }
  }, [loadableDesignState]);

  useEffect(() => {
    const initialRequestsPromisesFn = () => [
      loadAndSetOriginalSource(loadableDesignState?.imgSrc || source),
      ...(useBackendTranslations
        ? [getBackendTranslations(translations, language)]
        : []),
    ];

    handleLoading(initialRequestsPromisesFn);

    if (window && !avoidChangesNotSavedAlertOnLeave) {
      window.addEventListener('beforeunload', promptDialogIfHasChangeNotSaved);
    }

    return () => {
      if (window && !avoidChangesNotSavedAlertOnLeave) {
        window.removeEventListener(
          'beforeunload',
          promptDialogIfHasChangeNotSaved,
        );
      }
    };
  }, []);

  useEffect(() => {
    if (updateStateFnRef && typeof updateStateFnRef === 'object') {
      updateStateFnRef.current = (newStatePartObjOrFn) => {
        dispatch({
          type: UPDATE_STATE,
          payload: newStatePartObjOrFn,
        });
      };
    }
  }, [updateStateFnRef, dispatch]);

  useEffect(() => {
    if (
      getCurrentMediaDataFnRef &&
      typeof getCurrentMediaDataFnRef === 'object'
    ) {
      getCurrentMediaDataFnRef.current = (
        mediaFileInfo,
        pixelRatio,
        keepLoadingSpinnerShown,
      ) =>
        isImage(sourceType)
          ? transformImgFn(mediaFileInfo, pixelRatio, keepLoadingSpinnerShown)
          : transformVideoFn(mediaFileInfo);
    }
  }, [transformImgFn, sourceType]);

  useEffect(() => {
    haveNotSavedChangesRef.current = haveNotSavedChanges;
  }, [haveNotSavedChanges]);

  useEffect(() => {
    if (
      Object.keys(shownImageDimensions || {}).length > 0 &&
      !Object.keys(shownImageDimensions).some(
        (k) => !shownImageDimensions[k] && shownImageDimensions[k] !== 0,
      ) &&
      originalSource &&
      useCloudimage &&
      cloudimage?.loadableQuery &&
      !cloudimageQueryLoaded.current
    ) {
      dispatch({
        type: UPDATE_STATE,
        payload: cloudimageQueryToDesignState(
          cloudimage.loadableQuery,
          shownImageDimensions,
          originalSource,
        ),
      });
      cloudimageQueryLoaded.current = true;
    }
  }, [shownImageDimensions, originalSource, useCloudimage, cloudimage]);

  useEffect(() => {
    let isUnmounted = false;
    if (
      observePluginContainerSize &&
      pluginRootRef.current &&
      onPluginRootResize === 'function'
    ) {
      observeResize(pluginRootRef.current.parentNode, ({ width, height }) => {
        if (typeof onPluginRootResize === 'function') {
          onPluginRootResize(width, height);
        }
      });
    } else if (isUnmounted && typeof onPluginRootResize === 'function') {
      onPluginRootResize(undefined, undefined);
    }

    return () => {
      if (observePluginContainerSize && pluginRootRef.current) {
        unobserveElement(pluginRootRef.current);
      }

      isUnmounted = true;
    };
  }, [observePluginContainerSize]);

  useEffect(() => {
    if (updateStateFnRef && typeof updateStateFnRef === 'object') {
      updateStateFnRef.current = (newStatePartObjOrFn) => {
        dispatch({
          type: UPDATE_STATE,
          payload: newStatePartObjOrFn,
        });
      };
    }
  }, [updateStateFnRef, dispatch]);
};

export default useLoadMainSource;
