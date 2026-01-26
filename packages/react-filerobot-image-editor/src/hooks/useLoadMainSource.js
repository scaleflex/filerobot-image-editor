/** External Dependencies */
import { useEffect, useRef } from 'react';

/** Internal Dependencies */
import { HIDE_LOADER, RESET, SHOW_LOADER, UPDATE_STATE } from 'actions';
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
import useSetOriginalSource from './useSetOriginalSource';

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
    observePluginContainerSize,
    getCurrentImgDataFnRef,
    updateStateFnRef,
    resetOnSourceChange: configResetOnSourceChange,
    keepZoomOnSourceChange: configKeepZoomOnSourceChange,
    translationsGridUuid,
  } = config;
  const resetOnSourceChange =
    triggerResetOnSourceChange ?? configResetOnSourceChange;
  const keepZoomOnSourceChange =
    zoomKeptOnSourceChange ?? configKeepZoomOnSourceChange;
  const { loadAndSetOriginalSource } = useSetOriginalSource({
    resetOnSourceChange,
    keepZoomOnSourceChange,
  });
  const source = sourceToLoad || configSource;

  const [observeResize, unobserveElement] = useResizeObserver();
  const cloudimageQueryLoaded = useRef(false);

  // Hacky solution, For being used in beforeunload event
  // as it won't be possible to have the latest value of the state variable in js event handler.
  const haveNotSavedChangesRef = useRef(haveNotSavedChanges);
  const transformImgFn = useTransformedImgData();

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
        ? [getBackendTranslations(translations, translationsGridUuid, language)]
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
  }, [translationsGridUuid]);

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
