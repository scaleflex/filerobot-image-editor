/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-konva';

const TextNode = ({
  id, name, text, fontFamily, fontSize, fill, x, y, width, height, scaleX, scaleY, rotation,
  annotationEvents, stroke, strokeWidth, ...otherProps
}) => (
  <Text
    id={id}
    name={name}
    fill={fill}
    text={text}
    fontFamily={fontFamily}
    fontSize={fontSize}
    x={x}
    y={y}
    width={width}
    height={height}
    scaleX={scaleX}
    scaleY={scaleY}
    stroke={stroke}
    strokeWidth={strokeWidth}
    rotation={rotation}
    {...annotationEvents}
    {...otherProps}
  />
);

TextNode.defaultProps = {
  text: 'Lorem Ipsum...',
  fontFamily: 'Arial',
  fontSize: 14,
  fill: '#000',
  rotation: 0,
  width: 0,
  height: 0,
  scaleX: 1,
  scaleY: 1,
  stroke: '#000',
  strokeWidth: 0,
};

TextNode.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  annotationEvents: PropTypes.instanceOf(Object).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  rotation: PropTypes.number,
  scaleX: PropTypes.number,
  scaleY: PropTypes.number,
  text: PropTypes.string,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.number,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
};

export default TextNode;
