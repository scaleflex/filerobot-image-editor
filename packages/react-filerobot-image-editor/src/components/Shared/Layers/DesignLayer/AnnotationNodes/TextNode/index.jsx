/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';

/** Internal Dependencies */
import { useEditableTextId } from 'hooks';
import nodesCommonPropTypes from '../../nodesCommonPropTypes';
import TextNodeContentTextarea from './TextNodeContentTextarea';

const FormattedText = 'FormattedText';

const TextNode = ({
  id,
  name,
  text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur imperdiet tortor quis odio facilisis, id aliquet nulla facilisis. Etiam tincidunt tempor odio nec placerat.',
  fontFamily = 'Arial',
  fontSize = 14,
  fontStyle,
  fill = '#000',
  x,
  y,
  width = 0,
  height = 0,
  scaleX = 1,
  scaleY = 1,
  rotation = 0,
  annotationEvents,
  stroke,
  strokeWidth,
  shadowOffsetX,
  shadowOffsetY,
  shadowBlur,
  shadowColor,
  shadowOpacity,
  opacity = 1,
  letterSpacing,
  lineHeight,
  align = 'left',
  autoWidth = false,
  autoHeight = false,
  visible,
  padding,
  fontWeight,
  originalSourceInitialScale,
  ...otherProps
}) => {
  const editableTextId = useEditableTextId();
  const isBeingEdited = editableTextId === id;

  const textX = x || 0;
  const textY = y || 0;

  const textNode = (
    <FormattedText
      id={id}
      name={name}
      scaleX={scaleX}
      scaleY={scaleY}
      stroke={stroke}
      strokeWidth={strokeWidth}
      shadowOffsetX={shadowOffsetX}
      shadowOffsetY={shadowOffsetY}
      shadowBlur={shadowBlur}
      shadowColor={shadowColor}
      shadowOpacity={shadowOpacity}
      opacity={opacity || 0}
      fill={fill}
      text={text}
      fontFamily={fontFamily}
      fontStyle={fontStyle}
      fontWeight={fontWeight}
      fontSize={fontSize || 1}
      letterSpacing={letterSpacing || 0}
      lineHeight={typeof lineHeight !== 'number' ? 1 : lineHeight}
      align={align}
      x={isBeingEdited ? 0 : textX}
      y={isBeingEdited ? 0 : textY}
      rotation={isBeingEdited ? 0 : rotation}
      visible={isBeingEdited ? false : visible}
      width={autoWidth ? undefined : width}
      height={autoHeight ? undefined : height}
      autoWidth={autoWidth}
      autoHeight={autoHeight}
      scaleFormatDimensionsBy={originalSourceInitialScale}
      {...annotationEvents}
      {...otherProps}
    />
  );
  return isBeingEdited ? (
    <Group x={textX} y={textY} rotation={rotation}>
      {textNode}
      <TextNodeContentTextarea
        id={id}
        text={text}
        fill={fill}
        opacity={opacity}
        fontFamily={fontFamily}
        fontSize={fontSize}
        fontStyle={fontStyle}
        letterSpacing={letterSpacing}
        lineHeight={lineHeight}
        textAlign={align}
        width={width}
        height={height}
      />
    </Group>
  ) : (
    textNode
  );
};

TextNode.propTypes = {
  ...nodesCommonPropTypes.definitions,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  annotationEvents: PropTypes.instanceOf(Object).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({
        fontFamily: PropTypes.string,
        fontStyle: PropTypes.string,
        fontWeight: PropTypes.string,
        fontSize: PropTypes.number,
        fill: PropTypes.string,
        letterSpacing: PropTypes.number,
        baselineShift: PropTypes.number,
      }),
    ),
  ]).isRequired,
  fontFamily: PropTypes.string,
  fontStyle: PropTypes.string,
  fontWeight: PropTypes.string,
  fontSize: PropTypes.number,
  fill: PropTypes.string,
  letterSpacing: PropTypes.number,
  lineHeight: PropTypes.number,
  align: PropTypes.string,
};

export default TextNode;
