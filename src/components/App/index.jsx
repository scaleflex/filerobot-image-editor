/** External Dependencies */
import React, { useCallback, useContext, useEffect } from 'react';

/** Internal Dependencies */
import MainCanvas from 'components/MainCanvas';
import { ROOT_CONTAINER_ID } from 'utils/constants';
import Topbar from 'components/Topbar';
import Tabs from 'components/Tabs';
import AppContext from 'context';
import ToolsBar from 'components/ToolsBar';
import { SET_ERROR, SET_ORIGINAL_IMAGE, SHOW_LOADER } from 'actions';
import ErrorPopup from 'components/ErrorPopup';
import loadImage from 'utils/loadImage';
import {
  StyledAppWrapper,
  StyledMainContent,
  StyledCanvasAndTools,
} from './App.styled';

const App = () => {
  const { config, isLoadingGlobally, dispatch, originalImage } =
    useContext(AppContext);
  const { image } = config;

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

  useEffect(() => {
    dispatch({ type: SHOW_LOADER });

    if (typeof image === 'string') {
      loadImage(image).then(setNewOriginalImage).catch(setError);
    } else if (image instanceof HTMLImageElement) {
      setNewOriginalImage(image);
    } else {
      setError('Invalid image provided');
    }
  }, [image]);

  return (
    <StyledAppWrapper id={ROOT_CONTAINER_ID}>
      {isLoadingGlobally && 'Loading globally from wrapper...'}
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
