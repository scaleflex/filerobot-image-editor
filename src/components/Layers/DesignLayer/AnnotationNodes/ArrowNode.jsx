/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Arrow } from 'react-konva';

const ArrowNode = ({
  id, name, fill, width, height, scaleX, scaleY, rotation, annotationEvents,
  points, stroke, strokeWidth, lineCap, ...otherProps
}) => (
  <Arrow
    id={id}
    name={name}
    fill={fill}
    x={0}
    y={0}
    points={points}
    width={width}
    height={height}
    scaleX={scaleX}
    scaleY={scaleY}
    rotation={rotation}
    dash={[10, 10]}
    dashEnabled={false}
    stroke={stroke}
    strokeWidth={strokeWidth}
    lineCap={lineCap}
    {...annotationEvents}
    {...otherProps}
  />
);

ArrowNode.defaultProps = {
  fill: '#000',
  stroke: '#000',
  strokeWidth: 3,
  lineCap: 'butt',
  rotation: 0,
  width: 0,
  height: 0,
  scaleX: 1,
  scaleY: 1,
};

ArrowNode.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  points: PropTypes.instanceOf(Array).isRequired,
  annotationEvents: PropTypes.instanceOf(Object).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  rotation: PropTypes.number,
  scaleX: PropTypes.number,
  scaleY: PropTypes.number,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  lineCap: PropTypes.string,
};

export default ArrowNode;
