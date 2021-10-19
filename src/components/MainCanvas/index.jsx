/** External Dependencies */
import React, { useCallback, useContext } from 'react';

/** Internal Dependencies */
import { DesignLayer, TransformersLayer } from 'components/Layers';
import AppContext, {
  AppProviderOverridenValue,
  memoAndMapContextToProps,
} from 'context';
import { SET_CANVAS_SIZE } from 'actions';
import { useResizeObserver } from 'hooks';
import CanvasNode from './CanvasNode';
import { CanvasContainer } from './MainCanvas.styled';

const MainCanvas = () => {
  const [observeResize] = useResizeObserver();
  const providedAppContext = useContext(AppContext);

  const setNewCanvasSize = useCallback(
    ({ width: containerWidth, height: containerHeight }) => {
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

  const observeCanvasContainerResizing = useCallback((element) => {
    observeResize(element, setNewCanvasSize);
  }, []);

  return (
    <CanvasContainer ref={observeCanvasContainerResizing}>
      <CanvasNode>
        <AppProviderOverridenValue overridingValue={providedAppContext}>
          <DesignLayer />
          <TransformersLayer />
        </AppProviderOverridenValue>
      </CanvasNode>
    </CanvasContainer>
  );
};

export default memoAndMapContextToProps(MainCanvas);
