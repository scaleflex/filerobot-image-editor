/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Rect } from 'react-konva';

/** Internal Dependencies */
import nodesCommonPropTypes from '../nodesCommonPropTypes';

const RectNode = ({
  fill = '#000',
  cornerRadius = 0,
  width = 0,
  height = 0,

  id,
  name,
  x,
  y,
  scaleX,
  scaleY,
  rotation,
  annotationEvents,
  stroke,
  strokeWidth,
  shadowOffsetX,
  shadowOffsetY,
  shadowBlur,
  shadowColor,
  shadowOpacity,
  opacity,
  ...otherProps
}) => (
  <Rect
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
    x={x}
    y={y}
    width={width}
    height={height}
    opacity={opacity}
    cornerRadius={cornerRadius}
    {...annotationEvents}
    {...otherProps}
  />
);

RectNode.propTypes = {
  ...nodesCommonPropTypes.definitions,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  annotationEvents: PropTypes.instanceOf(Object).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  cornerRadius: PropTypes.number,
};

export default RectNode;
