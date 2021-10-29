/** External Dependencies */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import Konva from 'konva';
import { Stage, useStrictMode } from 'react-konva';

/** Internal Dependencies */
import AppContext from 'context';
import { CLEAR_ANNOTATIONS_SELECTIONS, ZOOM_CANVAS } from 'actions';
import {
  DEFAULT_ZOOM_FACTOR,
  POINTER_ICONS,
  TABS_IDS,
  TOOLS_IDS,
} from 'utils/constants';
import { endTouchesZooming, zoomOnTouchesMove } from './touchZoomingEvents';

const ZOOM_DELTA_TO_SCALE_CONVERT_FACTOR = 0.01;

const CanvasNode = ({ children }) => {
  useStrictMode(true);
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
  } = useContext(AppContext);
  const canvasRef = useRef();

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
    if (e.currentTarget.draggable()) {
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

    const scaleBy = e.evt.deltaY * ZOOM_DELTA_TO_SCALE_CONVERT_FACTOR || 1;
    const stageCanvas = e.currentTarget;
    const oldZoomScaleFactor = zoom.factor || 1;

    const isZoomIn = scaleBy < 0;
    const newScale = isZoomIn
      ? oldZoomScaleFactor * Math.abs(scaleBy)
      : oldZoomScaleFactor / scaleBy;

    if (newScale < 0.5) {
      return;
    }

    const pointer = stageCanvas.getPointerPosition();

    saveZoom({
      ...pointer,
      factor: newScale,
    });
  };

  // TODO: Once make annotation drawable while we are zoomed let's remove this and others related to prohibt zooming
  // while in annotation and crop
  useEffect(() => {
    if (tabId === TABS_IDS.ANNOTATE || toolId === TOOLS_IDS.CROP) {
      saveZoom({
        factor: DEFAULT_ZOOM_FACTOR,
        x: 'center',
        y: 'center',
      });
    }
  }, [tabId, toolId]);

  const zoomedResponsiveCanvasScale = canvasScale * (zoom.factor || 1);
  const isZoomEnabled =
    tabId !== TABS_IDS.ANNOTATE && toolId !== TOOLS_IDS.CROP;
  return (
    <Stage
      width={canvasWidth}
      height={canvasHeight}
      scaleX={zoomedResponsiveCanvasScale}
      scaleY={zoomedResponsiveCanvasScale}
      x={zoom.x || null}
      y={zoom.y || null}
      onWheel={isZoomEnabled ? handleZoom : undefined}
      onTap={clearSelections}
      onClick={clearSelections}
      onTouchMove={
        isZoomEnabled ? (e) => zoomOnTouchesMove(e, saveZoom) : undefined
      }
      onTouchEnd={isZoomEnabled ? endTouchesZooming : undefined}
      dragBoundFunc={dragBoundFunc}
      draggable={isZoomEnabled}
      onDragEnd={handleCanvasDragEnd}
      style={cursorStyle}
      ref={canvasRef}
    >
      {children}
    </Stage>
  );
};

CanvasNode.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CanvasNode;
