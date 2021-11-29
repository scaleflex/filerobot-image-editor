/** External Dependencies */
import React, { memo, useCallback, useEffect, useRef } from 'react';

/** Internal Dependencies */
import MainCanvas from 'components/MainCanvas';
import { ROOT_CONTAINER_CLASS_NAME } from 'utils/constants';
import Topbar from 'components/Topbar';
import Tabs from 'components/Tabs';
import ToolsBar from 'components/ToolsBar';
import {
  HIDE_LOADER,
  SET_ERROR,
  SET_ORIGINAL_IMAGE,
  SHOW_LOADER,
} from 'actions';
import ErrorPopup from 'components/ErrorPopup';
import loadImage from 'utils/loadImage';
import { usePhoneScreen, useStore } from 'hooks';
import Spinner from 'components/common/Spinner';
import { getBackendTranslations } from 'utils/translator';
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
    t,
  } = useStore();
  const {
    loadableDesignState,
    image,
    avoidChangesNotSavedAlertOnLeave,
    useBackendTranslations,
    language,
  } = config;
  const isPhoneScreen = usePhoneScreen();
  const isFirstRender = useRef(true);
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

  const setError = useCallback((error) => {
    dispatch({
      type: SET_ERROR,
      payload: {
        error: {
          message: error.message,
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
        loadImage(imgToLoad)
          .then(setNewOriginalImage)
          .catch(setError)
          .finally(resolve);
      } else if (imgToLoad instanceof HTMLImageElement) {
        setNewOriginalImage(imgToLoad);
      } else {
        setError(t('invalidImageError'));
      }

      resolve();
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
    if (!isFirstRender.current && image) {
      handleLoading([loadAndSetOriginalImage(image)]);
    }
  }, [image]);

  useEffect(() => {
    if (
      !isFirstRender.current &&
      typeof loadableDesignState === 'object' &&
      loadableDesignState.imageSrc
    ) {
      handleLoading([loadAndSetOriginalImage(loadableDesignState.imageSrc)]);
    }
  }, [loadableDesignState]);

  useEffect(() => {
    const initialRequestsPromises = [
      loadAndSetOriginalImage(loadableDesignState?.imageSrc || image),
    ];

    if (useBackendTranslations) {
      initialRequestsPromises.push(getBackendTranslations(language));
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
    >
      {isLoadingGlobally && <Spinner label={t('loading')} />}
      <Topbar />
      {originalImage && (
        <StyledMainContent>
          {!isPhoneScreen && <Tabs />}
          <StyledCanvasAndTools>
            <MainCanvas />
            {isPhoneScreen ? (
              <StyledPhoneToolsAndTabs>
                <ToolsBar />
                <Tabs />
              </StyledPhoneToolsAndTabs>
            ) : (
              <ToolsBar />
            )}
          </StyledCanvasAndTools>
        </StyledMainContent>
      )}
      <ErrorPopup />
    </StyledAppWrapper>
  );
};

export default memo(App);
