/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Ellipse } from 'react-konva';

/** Internal Dependencies */
import nodesCommonPropTypes from '../nodesCommonPropTypes';

const EllipseNode = ({
  id,
  name,
  fill,
  x,
  y,
  radiusX,
  radiusY,
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

EllipseNode.defaultProps = {
  ...nodesCommonPropTypes.defaults,
  fill: '#000',
  radiusX: 0,
  radiusY: 0,
};

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
