/** External Dependencies */
import React, { useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

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
  StyledWrapper,
  StyledMainContent,
  StyledCanvasAndTools,
} from './Wrapper.styled';

const Wrapper = ({ image }) => {
  const { isLoadingGlobally, dispatch, originalImage } = useContext(AppContext);

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
      type: SET_ERROR,
      payload: {
        error: newError,
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
    <StyledWrapper id={ROOT_CONTAINER_ID}>
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
    </StyledWrapper>
  );
};

Wrapper.propTypes = {
  image: PropTypes.oneOfType([
    PropTypes.instanceOf(HTMLImageElement),
    PropTypes.string,
  ]).isRequired,
};

export default Wrapper;
