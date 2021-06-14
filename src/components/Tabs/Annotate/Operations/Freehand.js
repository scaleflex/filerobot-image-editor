import Konva from 'konva';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Context from '../../../../context';
import useAnnotation from '../../../../hooks/useAnnotation';
import { POINTER_MODES } from '../../../../utils/constants';
import OptionsPopup from '../OptionsPopup';
import { AVAILABLE_ANNOTATIONS_NAMES } from '../OptionsPopup/OptionsPopup.constants';

import { AnnotateOperationsWrapper } from './Operations.styled';

const Freehand = ({
  defaultStrokeColor = '#ffffff', defaultStrokeSize = 4, defaultTension = 0.5, defaultLineCap = 'round'
}) => {
  const [_, addNewGroup] = useAnnotation({
    libClassName: 'Group',
    name: AVAILABLE_ANNOTATIONS_NAMES.FREEHAND,
    defaultDraw: true,
    noPointerEvents: true,
  });
  const { canvas, designLayer, pointerMode } = useContext(Context);
  const [tool, setTool] = useState('pen');
  const lastPosition = useRef({});
  const lastGroupRef = useRef(null);

  const handlePointerMove = useCallback((e) => {
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    const newLine = new Konva.Line({
      shadowColor: '#000000',
      fill: '#000000',
      stroke: defaultStrokeColor,
      strokeWidth: defaultStrokeSize,
      tension: defaultTension,
      lineCap: defaultLineCap,
      name: AVAILABLE_ANNOTATIONS_NAMES.FREEHAND_LINE,
      points: [lastPosition.current.x, lastPosition.current.y, point.x, point.y]
    });
    lastPosition.current = point;
    lastGroupRef.current.add(newLine);
  }, [defaultLineCap, defaultStrokeColor, defaultStrokeSize, defaultTension]);

  const handlePointerUp = useCallback(() => {
    lastGroupRef.current = null;
    canvas.off('mousemove touchmove', handlePointerMove);
    canvas.off('mouseup touchend mouseleave touchcancel', handlePointerUp);
  }, [canvas, handlePointerMove]);

  const handlePointerDown = useCallback((e) => {
    addNewGroup((updatedShape) => ({ ...updatedShape }));
    const groups = designLayer.find(`.${AVAILABLE_ANNOTATIONS_NAMES.FREEHAND}`);
    lastGroupRef.current = groups[groups.length - 1];

    const pos = e.target.getStage().getPointerPosition();
    lastPosition.current = {
      x: pos.x,
      y: pos.y,
    };
    canvas.on('mousemove touchmove', handlePointerMove);
    canvas.on('mouseup touchend mouseleave touchcancel', handlePointerUp);
  }, [addNewGroup, canvas, designLayer, handlePointerMove, handlePointerUp]);

  useEffect(() => {
    if (canvas) {
      if (pointerMode === POINTER_MODES.DRAW) {
        canvas.on('mousedown touchstart', handlePointerDown);
      } else {
        canvas.off('mousedown touchstart', handlePointerDown);
      }
    }

    return () => {
      if (canvas) {
        canvas.off('mousedown touchstart', handlePointerDown);
      }
    }
  }, [canvas, handlePointerDown, pointerMode]);
  
  return (
    <AnnotateOperationsWrapper>
      Hello, Freehand!
      <OptionsPopup />
    </AnnotateOperationsWrapper>
  );
}

export default Freehand;
