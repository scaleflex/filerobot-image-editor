import React, {
  useCallback, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { RadioGroup } from '@scaleflex/ui/core';
import Konva from 'konva';

import Context from '../../../../context';
import useAnnotation from '../../../../hooks/useAnnotation';
import { POINTER_MODES, SHAPES_NAMES } from '../../../../utils/constants';
import ShapesOptionsPopup from '../../../ShapesOptionsPopup';

import { AnnotateOperationsWrapper } from './Operations.styled';
import { OptionInput, OptionInputWrapper, OptionsWrapper } from '../../../ShapesOptionsPopup/ShapesOptionsPopup.styled';

const TOOL_BRUSH = 'brush';
const TOOL_ERASE = 'erase';

const Freehand = ({
  defaultStrokeColor = '#ffffff', defaultStrokeSize = 4, defaultTension = 0.5, defaultLineCap = 'round',
}) => {
  const [_, addNewGroup] = useAnnotation({
    libClassName: 'Group',
    name: SHAPES_NAMES.FREEHAND,
    defaultDraw: true,
    noPointerEvents: true,
    absoluteDimensions: false,
  });
  const { canvas, designLayer, pointerMode } = useContext(Context);
  const [brushOptions, setBrushOptions] = useState({
    color: defaultStrokeColor,
    strokeSize: defaultStrokeSize,
  });
  const [tool, setTool] = useState(TOOL_BRUSH);
  const lastPosition = useRef({});
  const lastGroupRef = useRef(null);

  const isBrushOn = useMemo(() => tool === TOOL_BRUSH, [tool]);

  const setToolToBrush = useCallback(() => {
    setTool(TOOL_BRUSH);
  }, []);

  const setToolToErase = useCallback(() => {
    setTool(TOOL_ERASE);
  }, []);

  const changeBrushOption = useCallback((e) => {
    const { name, value } = e.target;
    setBrushOptions((latestBrushInfo) => ({
      ...latestBrushInfo,
      [name]: value,
    }));
  }, []);

  const handlePointerMove = useCallback((e) => {
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    if (tool !== TOOL_ERASE) {
      const newLine = new Konva.Line({
        shadowColor: '#000000',
        fill: '#000000',
        stroke: brushOptions.color,
        strokeWidth: +brushOptions.strokeSize,
        tension: defaultTension,
        lineCap: defaultLineCap,
        name: SHAPES_NAMES.FREEHAND_LINE,
        points: [lastPosition.current.x, lastPosition.current.y, point.x, point.y],
      });
      lastPosition.current = point;
      lastGroupRef.current.add(newLine);
    } else if (e.target.name() === SHAPES_NAMES.FREEHAND_LINE) {
      // if the parent children has no other lines except the current one then destory the whole paths' group otherwise destroy the line only.
      if ((e.target.parent.children || []).length - 1 === 0) {
        e.target.parent.destroy();
      } else {
        e.target.destroy();
      }
    }
  }, [brushOptions, defaultLineCap, defaultTension, tool]);

  const handlePointerUp = useCallback(() => {
    lastGroupRef.current = null;
    canvas.off('mousemove touchmove', handlePointerMove);
    canvas.off('mouseup touchend mouseleave touchcancel', handlePointerUp);
  }, [canvas, handlePointerMove]);

  const handlePointerDown = useCallback((e) => {
    if (tool !== TOOL_ERASE) {
      addNewGroup((updatedShape) => ({ ...updatedShape }));
      const groups = designLayer.find(`.${SHAPES_NAMES.FREEHAND}`);
      lastGroupRef.current = groups[groups.length - 1];

      const pos = e.target.getStage().getPointerPosition();
      lastPosition.current = {
        x: pos.x,
        y: pos.y,
      };
    }

    canvas.on('mousemove touchmove', handlePointerMove);
    canvas.on('mouseup touchend mouseleave touchcancel', handlePointerUp);
  }, [addNewGroup, canvas, designLayer, handlePointerMove, handlePointerUp, tool]);

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
    };
  }, [canvas, handlePointerDown, pointerMode]);

  const renderToolRadio = () => {
    const toolRadioInputs = (
      <>
        <OptionInputWrapper>
          <RadioGroup
            checked={isBrushOn}
            label="Brush"
            onChange={setToolToBrush}
          />
        </OptionInputWrapper>
        <OptionInputWrapper>
          <RadioGroup
            checked={!isBrushOn}
            label="Erase"
            onChange={setToolToErase}
          />
        </OptionInputWrapper>
      </>
    );

    return isBrushOn ? <div>{toolRadioInputs}</div> : toolRadioInputs;
  };

  return (
    <AnnotateOperationsWrapper>
      <OptionsWrapper alignedCenter>
        {isBrushOn && (
          <>
            <OptionInputWrapper>
              <OptionInput
                inputProps={{ type: 'number', id: 'filerobot-image-editor_shape-freehand-width' }}
                LabelProps={{ htmlFor: 'filerobot-image-editor_shape-freehand-width' }}
                label="Stroke size"
                onChange={changeBrushOption}
                name="strokeSize"
                type="input"
                defaultValue={defaultStrokeSize}
                min={1}
                max={100}
                maxWidth={66}
              />
            </OptionInputWrapper>
            <OptionInputWrapper>
              <OptionInput
                inputProps={{ type: 'color', id: 'filerobot-image-editor_freehand-color' }}
                LabelProps={{ htmlFor: 'filerobot-image-editor_freehand-color' }}
                label="Color"
                onChange={changeBrushOption}
                type="input"
                name="color"
                defaultValue={defaultStrokeColor}
                maxWidth={50}
                noBorder
                noPadding
                noOutline
                pointerCursor
              />
            </OptionInputWrapper>
          </>
        )}
        {renderToolRadio()}
      </OptionsWrapper>
      <ShapesOptionsPopup />
    </AnnotateOperationsWrapper>
  );
};

export default Freehand;
