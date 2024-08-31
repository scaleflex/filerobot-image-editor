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
import { DEFAULT_ZOOM_FACTOR } from 'utils/constants';

const useLoadMainSource = ({
  sourceToLoad,
  onPluginRootResize,
  pluginRootRef,
  resetOnSourceChange: triggerResetOnSourceChange,
} = {}) => {
  const {
    config,
    haveNotSavedChanges,
    dispatch,
    originalSource,
    shownImageDimensions,
    t,
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
    defaultSavedImageName,
    observePluginContainerSize,
    getCurrentImgDataFnRef,
    updateStateFnRef,
    noCrossOrigin,
    resetOnSourceChange: configResetOnSourceChange,
  } = config;
  const source = sourceToLoad || configSource;
  const resetOnSourceChange =
    triggerResetOnSourceChange ?? configResetOnSourceChange;

  const [observeResize, unobserveElement] = useResizeObserver();
  const cloudimageQueryLoaded = useRef(false);
  const imageBeingLoadedSrc = useRef(null);
  // Hacky solution, For being used in beforeunload event
  // as it won't be possible to have the latest value of the state variable in js event handler.
  const haveNotSavedChangesRef = useRef(haveNotSavedChanges);
  const transformImgFn = useTransformedImgData();

  const setNewOriginalSource = useCallback(
    (newSource) => {
      dispatch({
        type: SET_ORIGINAL_SOURCE,
        payload: {
          originalSource: newSource,
          ...(!resetOnSourceChange && {
            zoom: {
              factor: DEFAULT_ZOOM_FACTOR,
              x: null,
              y: null,
            },
          }),
        },
      });
    },
    [resetOnSourceChange],
  );

  const setOriginalSourceIfDimensionsFound = (newSource) => {
    if (newSource?.width && newSource.height) {
      const newSourceClone = { ...newSource };
      delete newSourceClone.src;
      setNewOriginalSource(newSourceClone);
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
          if (!imgToLoad.name && defaultSavedImageName) {
            // eslint-disable-next-line no-param-reassign
            imgToLoad.name = defaultSavedImageName;
          }
          if (!imgToLoad.complete) {
            imgToLoad.addEventListener('load', () => {
              setNewOriginalSource(imgToLoad);
              triggerResolve();
            });
            return;
          }

          setNewOriginalSource(imgToLoad);
          triggerResolve();
        } else if (
          imgToLoad &&
          (typeof imgToLoad === 'string' || imgToLoad?.src)
        ) {
          loadImage(imgToLoad?.src || imgToLoad, {
            name: defaultSavedImageName,
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
    if (getCurrentImgDataFnRef && typeof getCurrentImgDataFnRef === 'object') {
      getCurrentImgDataFnRef.current = transformImgFn;
    }
  }, [transformImgFn]);

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
