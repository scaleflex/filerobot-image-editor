/** External Dependencies */
import React, { useCallback, useContext, useEffect } from 'react';
import Konva from 'konva';

/** Internal Dependencies */
import {
  DesignLayer,
  PreviewLayer,
  TransformersLayer,
} from 'components/Layers';
import AppContext, {
  AppProviderOverridenValue,
  memoAndMapContextToProps,
} from 'context';
import { SET_CANVAS_SIZE } from 'actions';
import { useResizeObserver } from 'hooks';
import rotateNodeAroundCenter from './rotateNodeAroundCenter';
import CanvasNode from './CanvasNode';
import { CanvasContainer } from './MainCanvas.styles';

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

  useEffect(() => {
    // Overriding setRotation as it doesn't rotate around center for (0, 0) origin nodes like rect.
    const originalKonvaRotationFn = Konva.Node.prototype.setRotation;
    Konva.Node.prototype.setRotation = function setRotation(rotationAngle) {
      const currentNodeContext = this;
      if (currentNodeContext.attrs.isTransformedFromAnchor) {
        return originalKonvaRotationFn.call(currentNodeContext, rotationAngle);
      }

      return rotateNodeAroundCenter(currentNodeContext, rotationAngle);
    };
  }, []);

  return (
    <CanvasContainer ref={observeCanvasContainerResizing}>
      <CanvasNode>
        <AppProviderOverridenValue overridingValue={providedAppContext}>
          <DesignLayer />
          <PreviewLayer />
          <TransformersLayer />
        </AppProviderOverridenValue>
      </CanvasNode>
    </CanvasContainer>
  );
};

export default memoAndMapContextToProps(MainCanvas);
