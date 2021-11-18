/** External Dependencies */
import React, { useCallback, useEffect, useRef } from 'react';

/** Internal Dependencies */
import MainCanvas from 'components/MainCanvas';
import { ROOT_CONTAINER_ID } from 'utils/constants';
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
import { useStore } from 'hooks';
import Spinner from 'components/common/Spinner';
import {
  StyledAppWrapper,
  StyledMainContent,
  StyledCanvasAndTools,
} from './App.styled';

const App = () => {
  const {
    config,
    isLoadingGlobally,
    haveNotSavedChanges,
    dispatch,
    originalImage,
  } = useStore();
  const { loadableDesignState, image, noChangesNotSavedAlertOnLeave } = config;
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

  const loadAndSetOriginalImage = (imgToLoad) => {
    if (!imgToLoad && originalImage) {
      return;
    }
    dispatch({ type: SHOW_LOADER });

    if (typeof imgToLoad === 'string') {
      loadImage(imgToLoad).then(setNewOriginalImage).catch(setError);
    } else if (imgToLoad instanceof HTMLImageElement) {
      setNewOriginalImage(imgToLoad);
    } else {
      setError('Invalid image provided');
      dispatch({ type: HIDE_LOADER });
    }
  };

  const promptDialogIfHasChangeNotSaved = (e) => {
    if (haveNotSavedChangesRef.current) {
      e.preventDefault();
      e.returnValue = '';
    }
  };

  useEffect(() => {
    if (!isFirstRender.current && image) {
      loadAndSetOriginalImage(image);
    }
  }, [image]);

  useEffect(() => {
    if (
      !isFirstRender.current &&
      typeof loadableDesignState === 'object' &&
      loadableDesignState.imageSrc
    ) {
      loadAndSetOriginalImage(loadableDesignState.imageSrc);
    }
  }, [loadableDesignState]);

  useEffect(() => {
    loadAndSetOriginalImage(loadableDesignState?.imageSrc || image);
    isFirstRender.current = false;

    if (window && !noChangesNotSavedAlertOnLeave) {
      window.addEventListener('beforeunload', promptDialogIfHasChangeNotSaved);
    }

    return () => {
      if (window && !noChangesNotSavedAlertOnLeave) {
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
    <StyledAppWrapper id={ROOT_CONTAINER_ID}>
      {isLoadingGlobally && <Spinner label="Loading image..." />}
      <Topbar />
      {originalImage && (
        <StyledMainContent>
          <Tabs />
          <StyledCanvasAndTools>
            <MainCanvas />
            <ToolsBar />
          </StyledCanvasAndTools>
        </StyledMainContent>
      )}
      <ErrorPopup />
    </StyledAppWrapper>
  );
};

export default App;
