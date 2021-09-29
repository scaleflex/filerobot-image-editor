/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Circle } from 'react-konva';

const CircleNode = ({
  id, name, fill, x, y, width, height, scaleX, scaleY, rotation, annotationEvents,
  stroke, strokeWidth, ...otherProps
}) => (
  <Circle
    id={id}
    name={name}
    fill={fill}
    x={x}
    y={y}
    width={width}
    height={height}
    radius={Math.max(width, height)}
    scaleX={scaleX}
    scaleY={scaleY}
    stroke={stroke}
    strokeWidth={strokeWidth}
    rotation={rotation}
    {...annotationEvents}
    {...otherProps}
  />
);

CircleNode.defaultProps = {
  fill: '#000',
  stroke: '#000',
  strokeWidth: 0,
  rotation: 0,
  width: 0,
  height: 0,
  scaleX: 1,
  scaleY: 1,
};

CircleNode.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  annotationEvents: PropTypes.instanceOf(Object).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  rotation: PropTypes.number,
  scaleX: PropTypes.number,
  scaleY: PropTypes.number,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
};

export default CircleNode;
