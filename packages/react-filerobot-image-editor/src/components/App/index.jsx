/** External Dependencies */
import React, { memo, useCallback, useEffect, useState, useRef } from 'react';

/** Internal Dependencies */
import MainCanvas from 'components/MainCanvas';
import { ROOT_CONTAINER_CLASS_NAME } from 'utils/constants';
import Topbar from 'components/Topbar';
import Tabs from 'components/Tabs';
import ToolsBar from 'components/ToolsBar';
import {
  HIDE_LOADER,
  SET_FEEDBACK,
  SET_ORIGINAL_IMAGE,
  SHOW_LOADER,
  UPDATE_STATE,
} from 'actions';
import FeedbackPopup from 'components/FeedbackPopup';
import loadImage from 'utils/loadImage';
import {
  usePhoneScreen,
  useResizeObserver,
  useStore,
  useTransformedImgData,
} from 'hooks';
import Spinner from 'components/common/Spinner';
import { getBackendTranslations } from 'utils/translator';
import cloudimageQueryToDesignState from 'utils/cloudimageQueryToDesignState';
import finetunesStrsToClasses from 'utils/finetunesStrsToClasses';
import filterStrToClass from 'utils/filterStrToClass';
import isSameImage from 'utils/isSameImage';
import {
  StyledAppWrapper,
  StyledMainContent,
  StyledCanvasAndTools,
  StyledPhoneToolsAndTabs,
} from './App.styled';

const App = () => {
  const {
    config,
    isLoadingGlobally,
    haveNotSavedChanges,
    dispatch,
    originalImage,
    shownImageDimensions,
    t,
    feedback = {},
  } = useStore();
  const {
    loadableDesignState,
    useCloudimage,
    cloudimage,
    source,
    avoidChangesNotSavedAlertOnLeave,
    useBackendTranslations,
    translations,
    language,
    defaultSavedImageName,
    observePluginContainerSize,
    showCanvasOnly,
    getCurrentImgDataFnRef,
    updateStateFnRef,
  } = config;

  const [observeResize, unobserveElement] = useResizeObserver();
  const [rootSize, setRootSize] = useState({
    width: undefined,
    height: undefined,
  });
  const isPhoneScreen = usePhoneScreen();
  const pluginRootRef = useRef(null);
  const isFirstRender = useRef(true);
  const cloudimageQueryLoaded = useRef(false);
  const imageBeingLoadedSrc = useRef(null);
  // Hacky solution, For being used in beforeunload event
  // as it won't be possible to have the latest value of the state variable in js event handler.
  const haveNotSavedChangesRef = useRef(haveNotSavedChanges);
  const transformImgFn = useTransformedImgData();

  const setNewOriginalImage = useCallback((newOriginalImage) => {
    dispatch({
      type: SET_ORIGINAL_IMAGE,
      payload: {
        originalImage: newOriginalImage,
      },
    });
  }, []);

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
  const loadAndSetOriginalImage = (imgToLoad) =>
    new Promise((resolve) => {
      const imgSrc = imgToLoad?.src || imgToLoad;
      if (
        imageBeingLoadedSrc.current === imgSrc ||
        (!imgSrc && originalImage) ||
        isSameImage(imgSrc, originalImage)
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

      if (typeof imgToLoad === 'string') {
        loadImage(imgToLoad, defaultSavedImageName)
          .then(setNewOriginalImage)
          .catch(setError)
          .finally(triggerResolve);
      } else if (imgToLoad instanceof HTMLImageElement) {
        setNewOriginalImage(imgToLoad);
        triggerResolve();
      } else {
        setError(t('invalidImageError'));
        triggerResolve();
      }
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

    return Promise.all(loadingPromisesFn()).finally(() => {
      dispatch({ type: HIDE_LOADER });
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

  useEffect(() => {
    if (
      !isFirstRender.current &&
      source &&
      !isSameImage(source, originalImage)
    ) {
      cloudimageQueryLoaded.current = false;
      handleLoading(() => [loadAndSetOriginalImage(source)]);
    }
  }, [source]);

  useEffect(() => {
    if (!isFirstRender.current) {
      const newImgSrc = loadableDesignState?.imgSrc;
      if (newImgSrc && !isSameImage(newImgSrc, originalImage)) {
        handleLoading(() => [
          loadAndSetOriginalImage(newImgSrc).then(
            updateDesignStateWithLoadableOne,
          ),
        ]);
      } else {
        updateDesignStateWithLoadableOne();
      }
    }
  }, [loadableDesignState]);

  useEffect(() => {
    if (
      Object.keys(shownImageDimensions || {}).length > 0 &&
      !Object.keys(shownImageDimensions).some(
        (k) => !shownImageDimensions[k],
      ) &&
      originalImage &&
      useCloudimage &&
      cloudimage?.loadableQuery &&
      !cloudimageQueryLoaded.current
    ) {
      dispatch({
        type: UPDATE_STATE,
        payload: cloudimageQueryToDesignState(
          cloudimage.loadableQuery,
          shownImageDimensions,
          originalImage,
        ),
      });
      cloudimageQueryLoaded.current = true;
    }
  }, [shownImageDimensions, originalImage, useCloudimage, cloudimage]);

  useEffect(() => {
    let isUnmounted = false;
    if (observePluginContainerSize && pluginRootRef.current) {
      observeResize(pluginRootRef.current.parentNode, ({ width, height }) =>
        setRootSize({ width, height }),
      );
    } else if (rootSize.width && rootSize.height && !isUnmounted) {
      setRootSize({ width: undefined, height: undefined });
    }

    return () => {
      if (observePluginContainerSize && pluginRootRef.current) {
        unobserveElement(pluginRootRef.current);
      }

      isUnmounted = true;
    };
  }, [observePluginContainerSize]);

  useEffect(() => {
    const initialRequestsPromisesFn = () => [
      loadAndSetOriginalImage(loadableDesignState?.imgSrc || source),
      ...(useBackendTranslations
        ? [getBackendTranslations(language, translations)]
        : []),
    ];

    handleLoading(initialRequestsPromisesFn);
    isFirstRender.current = false;

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

  return (
    <StyledAppWrapper
      className={ROOT_CONTAINER_CLASS_NAME}
      data-phone={isPhoneScreen}
      ref={pluginRootRef}
      $size={rootSize}
    >
      {isLoadingGlobally && <Spinner label={t('loading')} />}
      {!showCanvasOnly && <Topbar />}
      {originalImage && feedback.duration !== 0 && (
        <StyledMainContent className="FIE_main-container">
          {!isPhoneScreen && !showCanvasOnly && <Tabs />}
          <StyledCanvasAndTools className="FIE_editor-content">
            <MainCanvas />
            {!showCanvasOnly &&
              (isPhoneScreen ? (
                <StyledPhoneToolsAndTabs className="FIE_phone-tools-tabs-wrapper">
                  <ToolsBar />
                  <Tabs />
                </StyledPhoneToolsAndTabs>
              ) : (
                <ToolsBar />
              ))}
          </StyledCanvasAndTools>
        </StyledMainContent>
      )}
      <FeedbackPopup />
    </StyledAppWrapper>
  );
};

export default memo(App);
