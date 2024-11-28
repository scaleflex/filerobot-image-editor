/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Ellipse } from 'react-konva';

/** Internal Dependencies */
import nodesCommonPropTypes from '../nodesCommonPropTypes';

const EllipseNode = ({
  id,
  name,
  fill = '#000000',
  x,
  y,
  radiusX = 0,
  radiusY = 0,
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
  ...otherProps
}) => (
  <Ellipse
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
    radiusX={radiusX}
    radiusY={radiusY}
    offsetX={-radiusX}
    offsetY={-radiusY}
    opacity={opacity}
    {...annotationEvents}
    {...otherProps}
  />
);

EllipseNode.propTypes = {
  ...nodesCommonPropTypes.definitions,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  annotationEvents: PropTypes.instanceOf(Object).isRequired,
  radiusX: PropTypes.number,
  radiusY: PropTypes.number,
  fill: PropTypes.string,
};

export default EllipseNode;
