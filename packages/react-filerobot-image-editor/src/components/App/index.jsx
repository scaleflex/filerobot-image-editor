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
import { usePhoneScreen, useResizeObserver, useStore } from 'hooks';
import Spinner from 'components/common/Spinner';
import { getBackendTranslations } from 'utils/translator';
import cloudimageQueryToDesignState from 'utils/cloudimageQueryToDesignState';
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
    img,
    avoidChangesNotSavedAlertOnLeave,
    useBackendTranslations,
    translations,
    language,
    defaultSavedImageName,
    observePluginContainerSize,
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
  // Hacky solution, For being used in beforeunload event
  // as it won't be possible to have the latest value of the state variable in js event handler.
  const haveNotSavedChangesRef = useRef(haveNotSavedChanges);

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
      if (!imgToLoad && originalImage) {
        resolve();
      }

      if (typeof imgToLoad === 'string') {
        loadImage(imgToLoad, defaultSavedImageName)
          .then(setNewOriginalImage)
          .catch(setError)
          .finally(resolve);
      } else if (imgToLoad instanceof HTMLImageElement) {
        setNewOriginalImage(imgToLoad);
        resolve();
      } else {
        setError(t('invalidImageError'));
        resolve();
      }
    });

  const promptDialogIfHasChangeNotSaved = (e) => {
    if (haveNotSavedChangesRef.current) {
      e.preventDefault();
      e.returnValue = '';
    }
  };

  const handleLoading = (loadingPromises = []) => {
    dispatch({ type: SHOW_LOADER });

    return Promise.all(loadingPromises).finally(() => {
      dispatch({ type: HIDE_LOADER });
    });
  };

  useEffect(() => {
    if (!isFirstRender.current && img) {
      cloudimageQueryLoaded.current = false;
      handleLoading([loadAndSetOriginalImage(img)]);
    }
  }, [img]);

  useEffect(() => {
    if (!isFirstRender.current && loadableDesignState?.imgSrc) {
      handleLoading([loadAndSetOriginalImage(loadableDesignState.imgSrc)]);
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
    const initialRequestsPromises = [
      loadAndSetOriginalImage(loadableDesignState?.imgSrc || img),
    ];

    if (useBackendTranslations) {
      initialRequestsPromises.push(
        getBackendTranslations(language, translations),
      );
    }

    handleLoading(initialRequestsPromises);
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
      <Topbar />
      {originalImage && feedback.duration !== 0 && (
        <StyledMainContent className="FIE_main-container">
          {!isPhoneScreen && <Tabs />}
          <StyledCanvasAndTools className="FIE_editor-content">
            <MainCanvas />
            {isPhoneScreen ? (
              <StyledPhoneToolsAndTabs className="FIE_phone-tools-tabs-wrapper">
                <ToolsBar />
                <Tabs />
              </StyledPhoneToolsAndTabs>
            ) : (
              <ToolsBar />
            )}
          </StyledCanvasAndTools>
        </StyledMainContent>
      )}
      <FeedbackPopup />
    </StyledAppWrapper>
  );
};

export default memo(App);
