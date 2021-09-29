/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Rect } from 'react-konva';

const RectNode = ({
  id, name, fill, x, y, width, height, scaleX, scaleY, rotation, annotationEvents,
  stroke, strokeWidth, ...otherProps
}) => (
  <Rect
    id={id}
    name={name}
    fill={fill}
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

RectNode.defaultProps = {
  fill: '#000',
  rotation: 0,
  width: 0,
  height: 0,
  scaleX: 1,
  scaleY: 1,
  stroke: '#000',
  strokeWidth: 0,
};

RectNode.propTypes = {
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

export default RectNode;
