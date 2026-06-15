/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Arrow } from 'react-konva';

/** Internal Dependencies */
import nodesCommonPropTypes from '../nodesCommonPropTypes';

const ArrowNode = ({
  stroke = '#000000',
  strokeWidth = 6,
  fill = undefined,
  lineCap = 'butt',
  pointerLength = undefined,
  pointerWidth = undefined,

  id,
  name,
  scaleX,
  scaleY,
  rotation,
  annotationEvents,
  points,
  shadowOffsetX,
  shadowOffsetY,
  shadowBlur,
  shadowColor,
  shadowOpacity,
  opacity,
  ...otherProps
}) => (
  <Arrow
    {...nodesCommonPropTypes.defaults}
    id={id}
    name={name}
    rotation={rotation}
    scaleX={scaleX}
    scaleY={scaleY}
    stroke={stroke}
    strokeWidth={strokeWidth}
    shadowOffsetX={shadowOffsetX}
    shadowOffsetY={shadowOffsetY}
    shadowBlur={shadowBlur}
    shadowColor={shadowColor}
    shadowOpacity={shadowOpacity}
    fill={fill}
    x={0}
    y={0}
    points={points}
    pointerLength={pointerLength}
    pointerWidth={pointerWidth}
    lineCap={lineCap}
    opacity={opacity}
    {...annotationEvents}
    {...otherProps}
  />
);

ArrowNode.propTypes = {
  ...nodesCommonPropTypes.definitions,
  points: PropTypes.instanceOf(Array).isRequired,
  annotationEvents: PropTypes.instanceOf(Object).isRequired,
  pointerLength: PropTypes.number,
  pointerWidth: PropTypes.number,
  fill: PropTypes.string,
  lineCap: PropTypes.string,
};

export default ArrowNode;
