/** External Dependencies */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
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
  const isZoomEnabled = toolId !== TOOLS_IDS.CROP;
  const [isPanningEnabled, setIsPanningEnabled] = useState(
    tabId !== TABS_IDS.ANNOTATE,
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

  const togglePanningOnRightClick = () => {
    if (tabId === TABS_IDS.ANNOTATE) {
      setIsPanningEnabled((val) => !val);
    }
  };

  useEffect(() => {
    setIsPanningEnabled(tabId !== TABS_IDS.ANNOTATE);
  }, [tabId]);

  // Zoom panning is done by dragging mouse except in annotate tab,
  // it's done by toggling panning through mouse right click (enable/disable) then drag mouse.
  const zoomedResponsiveCanvasScale =
    canvasScale * ((isZoomEnabled && zoom.factor) || DEFAULT_ZOOM_FACTOR);
  return (
    <Stage
      width={canvasWidth}
      height={canvasHeight}
      scaleX={zoomedResponsiveCanvasScale}
      scaleY={zoomedResponsiveCanvasScale}
      x={(isZoomEnabled && zoom.x) || null}
      y={(isZoomEnabled && zoom.y) || null}
      zoomFactor={(isZoomEnabled && zoom.factor) || DEFAULT_ZOOM_FACTOR}
      onWheel={isZoomEnabled ? handleZoom : undefined}
      onTap={clearSelections}
      onClick={clearSelections}
      onContextMenu={togglePanningOnRightClick}
      onTouchMove={
        isZoomEnabled ? (e) => zoomOnTouchesMove(e, saveZoom) : undefined
      }
      onTouchEnd={isZoomEnabled ? endTouchesZooming : undefined}
      dragBoundFunc={dragBoundFunc}
      draggable={isZoomEnabled && isPanningEnabled}
      onDragEnd={handleCanvasDragEnd}
      style={cursorStyle}
    >
      {children}
    </Stage>
  );
};

CanvasNode.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CanvasNode;
