/** External Dependencies */
import React, { memo, useCallback, useEffect, useMemo, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Konva from 'konva';
import { useStrictMode } from 'react-konva';

/** Internal Dependencies */
import {
  CHANGE_POINTER_ICON,
  CLEAR_ANNOTATIONS_SELECTIONS,
  ZOOM_CANVAS,
} from 'actions';
import {
  DEFAULT_ZOOM_FACTOR,
  POINTER_ICONS,
  TABS_IDS,
  TOOLS_IDS,
} from 'utils/constants';
import { useStore } from 'hooks';
import { endTouchesZooming, zoomOnTouchesMove } from './touchZoomingEvents';
import { StyledCanvasNode } from './MainCanvas.styled';

const ZOOM_DELTA_TO_SCALE_CONVERT_FACTOR = 0.006;

const CanvasNode = ({ children }) => {
  useStrictMode(true);
  const canvasRef = useRef();
  const {
    dispatch,
    pointerCssIcon,
    tabId,
    toolId,
    canvasWidth,
    canvasHeight,
    canvasScale,
    selectionsIds = [],
    zoom = {},
    config: { previewPixelRatio, disableZooming },
  } = useStore();
  Konva.pixelRatio = previewPixelRatio;
  const defaultZoomFactor = DEFAULT_ZOOM_FACTOR;
  const isZoomEnabled = !disableZooming && toolId !== TOOLS_IDS.CROP;
  const [isPanningEnabled, setIsPanningEnabled] = useState(
    tabId !== TABS_IDS.ANNOTATE &&
      tabId !== TABS_IDS.WATERMARK &&
      zoom.factor > defaultZoomFactor,
  );

  const cursorStyle = useMemo(
    () => ({
      cursor:
        pointerCssIcon === POINTER_ICONS.DEFAULT && tabId === TABS_IDS.ANNOTATE
          ? POINTER_ICONS.DRAW
          : pointerCssIcon,
    }),
    [tabId, pointerCssIcon],
  );

  const saveZoom = (newZoomProps) => {
    dispatch({
      type: ZOOM_CANVAS,
      payload: newZoomProps,
    });
  };

  const handleCanvasDragEnd = (e) => {
    if (
      e.currentTarget.draggable() &&
      e.target.nodeType.toLowerCase() === 'stage' &&
      isZoomEnabled &&
      isPanningEnabled
    ) {
      saveZoom({
        factor: zoom.factor,
        x: e.target.x(),
        y: e.target.y(),
        preparedDimensions: true,
      });
    }
  };

  const clearSelections = useCallback(
    (e) => {
      e.evt.preventDefault();
      e.currentTarget.container?.().focus();

      if (e.target instanceof Konva.Stage && selectionsIds.length > 0) {
        dispatch({
          type: CLEAR_ANNOTATIONS_SELECTIONS,
        });
      }
    },
    [selectionsIds],
  );

  const dragBoundFunc = (pos) => {
    const x = Math.min(0, Math.max(pos.x, canvasWidth * (1 - zoom.factor)));
    const y = Math.min(0, Math.max(pos.y, canvasHeight * (1 - zoom.factor)));

    return {
      x,
      y,
    };
  };

  const handleZoom = (e) => {
    e.evt.preventDefault();
    const newScale =
      (zoom.factor || defaultZoomFactor) +
      e.evt.deltaY * -ZOOM_DELTA_TO_SCALE_CONVERT_FACTOR;

    const pointer = e.currentTarget.getPointerPosition();

    saveZoom({
      ...pointer,
      factor: newScale,
    });
  };

  const preventDraggingIfMultiTouches = (e) => {
    if (e.evt.touches?.length > 1) {
      setIsPanningEnabled(false);
    }
  };

  const resetPanningAbility = () =>
    setIsPanningEnabled(
      tabId !== TABS_IDS.ANNOTATE || tabId === TABS_IDS.WATERMARK,
    );

  const endTouchesZoomingEnablePanning = () => {
    endTouchesZooming(resetPanningAbility);
  };

  const mapKeyboardKeys = (e) => {
    if (
      (e.code === 'Space' || e.key === 'Control') &&
      !e.repeat &&
      zoom.factor > defaultZoomFactor &&
      isZoomEnabled
    ) {
      e.preventDefault();
      setIsPanningEnabled(true);
      dispatch({
        type: CHANGE_POINTER_ICON,
        payload: {
          pointerCssIcon: POINTER_ICONS.DRAG,
        },
      });
    }
  };

  const revertKeyboardKeysEffect = (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      resetPanningAbility();
    }
  };

  const focusCanvasOnEnter = () => {
    if (canvasRef.current) {
      canvasRef.current.container().focus();
    }
  };

  useEffect(() => {
    dispatch({
      type: CHANGE_POINTER_ICON,
      payload: {
        pointerCssIcon: POINTER_ICONS[isPanningEnabled ? 'DRAG' : 'DEFAULT'],
      },
    });
  }, [isPanningEnabled]);

  useEffect(() => {
    setIsPanningEnabled(
      tabId !== TABS_IDS.ANNOTATE &&
        tabId !== TABS_IDS.WATERMARK &&
        zoom.factor > defaultZoomFactor,
    );

    // Remove & register the event on changing tabId, zoom.factor, defaultZoomFactor to always access latest state.
    let canvasContainer;
    if (canvasRef.current) {
      canvasContainer = canvasRef.current.container();
      canvasContainer.addEventListener('mouseenter', focusCanvasOnEnter);
      canvasContainer.addEventListener('keydown', mapKeyboardKeys);
      canvasContainer.addEventListener('keyup', revertKeyboardKeysEffect);
    }

    return () => {
      if (canvasContainer) {
        canvasContainer.removeEventListener('mouseenter', focusCanvasOnEnter);
        canvasContainer.removeEventListener('keydown', mapKeyboardKeys);
        canvasContainer.removeEventListener('keyup', revertKeyboardKeysEffect);
      }
    };
  }, [tabId, zoom.factor, defaultZoomFactor]);

  // Zoom panning is done by dragging mouse except in annotate tab,
  // it's done by toggling panning through mouse right click (enable/disable) then drag mouse.
  const zoomedResponsiveCanvasScale =
    canvasScale * ((isZoomEnabled && zoom.factor) || defaultZoomFactor);
  return (
    <StyledCanvasNode
      className="FIE_canvas-node"
      tabIndex={-1}
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      scaleX={zoomedResponsiveCanvasScale}
      scaleY={zoomedResponsiveCanvasScale}
      x={(isZoomEnabled && zoom.x) || null}
      y={(isZoomEnabled && zoom.y) || null}
      zoomFactor={(isZoomEnabled && zoom.factor) || defaultZoomFactor}
      onWheel={isZoomEnabled ? handleZoom : undefined}
      onTap={clearSelections}
      onClick={clearSelections}
      onTouchMove={
        isZoomEnabled ? (e) => zoomOnTouchesMove(e, saveZoom) : undefined
      }
      onDragStart={preventDraggingIfMultiTouches}
      onTouchEnd={isZoomEnabled ? endTouchesZoomingEnablePanning : undefined}
      dragBoundFunc={dragBoundFunc}
      draggable={isZoomEnabled && isPanningEnabled}
      onDragEnd={handleCanvasDragEnd}
      style={cursorStyle}
    >
      {children}
    </StyledCanvasNode>
  );
};

CanvasNode.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(CanvasNode);
