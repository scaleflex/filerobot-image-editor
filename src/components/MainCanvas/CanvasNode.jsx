/** External Dependencies */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import Konva from 'konva';
import { Stage } from 'react-konva';

/** Internal Dependencies */
import AppContext from 'context';
import { CLEAR_ANNOTATIONS_SELECTIONS, ZOOM_CANVAS } from 'actions';
import getRotatedImageSize from 'utils/getRotatedImageSize';
import getCanvasZoomPointPosition, {
  boundPositionInCanvas,
} from './getCanvasZoomPointPosition';
import { POINTER_ICONS, TABS_IDS } from 'utils/constants';

const POINTER_ZOOM_BY_FACTOR = 0.3;

const CanvasNode = ({ children }) => {
  const canvasRef = useRef();
  const latestZoomFactor = useRef(1);

  const {
    dispatch,
    pointerCssIcon,
    tabId,
    canvasWidth,
    canvasHeight,
    canvasScale,
    selectionsIds = [],
    zoom = {},
    // adjustments: {
    //   isFlippedX,
    //   isFlippedY,
    //   rotation,
    // },
  } = useContext(AppContext);

  const cursorStyle = useMemo(
    () => ({
      cursor:
        pointerCssIcon === POINTER_ICONS.DEFAULT && tabId === TABS_IDS.ANNOTATE
          ? POINTER_ICONS.DRAW
          : pointerCssIcon,
    }),
    [tabId, pointerCssIcon],
  );

  // const scale = useMemo(() => {
  //   if (!canvasRef.current) {
  //     return { x: 1, y: 1 };
  //   }

  //   const xBaseScale = canvasRef.current.scaleX() / latestZoomFactor.current;
  //   const yBaseScale = canvasRef.current.scaleY() / latestZoomFactor.current;
  //   const xZoomedFlippedScale = (isFlippedX ? -1 : 1) * Math.abs(xBaseScale * zoom.factor);
  //   const yZoomedFlippedScale = (isFlippedY ? -1 : 1) * Math.abs(yBaseScale * zoom.factor);

  //   return {
  //     x: xZoomedFlippedScale,
  //     y: yZoomedFlippedScale,
  //   };
  // }, [isFlippedX, isFlippedY, zoom.factor]);

  const clearSelections = useCallback(
    (e) => {
      if (e.target instanceof Konva.Stage && selectionsIds.length > 0) {
        dispatch({
          type: CLEAR_ANNOTATIONS_SELECTIONS,
        });
      }
    },
    [selectionsIds],
  );

  // const dragBoundFunc = useCallback(
  //   (pos) => boundPositionInCanvas(canvasRef.current, pos, scale),
  //   [scale],
  // );

  useEffect(() => {
    latestZoomFactor.current = zoom.factor;
  }, [zoom.factor]);

  // For having proper rotation, and should check if vertical or horizontal
  // const { width, height } = getRotatedImageSize(editedImage.width, editedImage.height, rotation);
  // scale={{
  //   x: editedImage.width / (height / (editedImage.height / editedImage.width)),
  //   y: editedImage.height / height,
  // }}

  return (
    <Stage
      width={canvasWidth}
      height={canvasHeight}
      scaleX={canvasScale}
      scaleY={canvasScale}
      onClick={clearSelections}
      onTap={clearSelections}
      // dragBoundFunc={dragBoundFunc}
      // draggable
      // rotation={rotation}
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
