/** External Dependencies */
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { AppProviderOverriddenValue } from 'context';
import { SET_CANVAS_SIZE } from 'actions';
import { useResizeObserver, useStore, useLoadMainSource } from 'hooks';
import NodeControls from 'components/NodeControls';
import FeedbackPopup from 'components/FeedbackPopup';
import Spinner from 'components/common/Spinner';
import CanvasNode from './CanvasNode';
import { CanvasContainer, StyledOriginalImage } from './MainCanvas.styled';

const MainCanvasWrapper = ({
  onPluginRootResize,
  pluginRootRef,
  source,
  previewBgColor,
  previewBgImage,
  resetOnSourceChange,
  children,
  ...props
}) => {
  const [observeResize, unobserveElement] = useResizeObserver();
  const currentAppContextData = useStore();
  const canvasContainerRef = useRef(null);
  useLoadMainSource({
    sourceToLoad: source,
    resetOnSourceChange,
    onPluginRootResize,
    pluginRootRef,
  });

  const providedAppContext = useMemo(
    () => ({
      ...currentAppContextData,
      previewBgColor: previewBgColor || currentAppContextData.previewBgColor,
      previewBgImage: previewBgImage || currentAppContextData.previewBgImage,
    }),
    [currentAppContextData, previewBgColor, previewBgImage],
  );

  const setNewCanvasSize = useCallback(
    ({ width: containerWidth, height: containerHeight }) => {
      if (!containerWidth || !containerHeight) {
        return;
      }

      providedAppContext.dispatch({
        type: SET_CANVAS_SIZE,
        payload: {
          canvasWidth: containerWidth,
          canvasHeight: containerHeight,
        },
      });
    },
    [],
  );

  useEffect(() => {
    if (providedAppContext.originalSource) {
      observeResize(canvasContainerRef.current, setNewCanvasSize);
    }

    return () => {
      if (canvasContainerRef.current) {
        unobserveElement(canvasContainerRef.current);
      }
    };
  }, [providedAppContext.originalSource]);

  const renderCanvasContent = () => (
    <>
      {!providedAppContext.textIdOfEditableContent && <NodeControls />}
      {providedAppContext.isShowOriginalImage &&
        providedAppContext.originalSource?.src && (
          <StyledOriginalImage
            className="FIE_original-image-compare"
            src={providedAppContext.originalSource.src}
          />
        )}
      <CanvasNode>
        <AppProviderOverriddenValue overridingValue={providedAppContext}>
          {children}
        </AppProviderOverriddenValue>
      </CanvasNode>
    </>
  );

  const isFixedAndCanvasHidableError =
    providedAppContext.feedback.duration === 0;

  return (
    <>
      <Spinner
        isLoading={providedAppContext.isLoadingGlobally}
        theme={providedAppContext.theme}
      />
      <CanvasContainer
        className="FIE_canvas-container"
        ref={canvasContainerRef}
        {...props}
      >
        {!isFixedAndCanvasHidableError &&
          Boolean(providedAppContext.originalSource) &&
          renderCanvasContent()}
      </CanvasContainer>
      <FeedbackPopup />
    </>
  );
};

MainCanvasWrapper.propTypes = {
  source: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(HTMLImageElement),
    PropTypes.instanceOf(SVGImageElement),
    PropTypes.instanceOf(ImageBitmap),
    PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      bgColor: PropTypes.string,
      src: PropTypes.string,
    }),
  ]),
  onPluginRootResize: PropTypes.func,
  pluginRootRef: PropTypes.instanceOf(Object),
  previewBgColor: PropTypes.string,
  previewBgImage: PropTypes.oneOfType([
    PropTypes.instanceOf(HTMLImageElement),
    PropTypes.instanceOf(SVGImageElement),
    PropTypes.instanceOf(ImageBitmap),
  ]),
  resetOnSourceChange: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default MainCanvasWrapper;
