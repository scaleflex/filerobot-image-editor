/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { RegularPolygon } from 'react-konva';

/** Internal Dependencies */
import nodesCommonPropTypes from '../nodesCommonPropTypes';

const PolygonNode = ({
  id,
  name,
  fill,
  x,
  y,
  radius,
  scaleX,
  scaleY,
  rotation,
  sides,
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
  <RegularPolygon
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
    radius={radius}
    offsetX={-radius}
    offsetY={-radius}
    sides={sides}
    opacity={opacity}
    {...annotationEvents}
    {...otherProps}
  />
);

PolygonNode.defaultProps = {
  ...nodesCommonPropTypes.defaults,
  fill: '#000',
  sides: 3,
};

PolygonNode.propTypes = {
  ...nodesCommonPropTypes.definitions,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  annotationEvents: PropTypes.instanceOf(Object).isRequired,
  radius: PropTypes.number.isRequired,
  fill: PropTypes.string,
  sides: PropTypes.number,
};

export default PolygonNode;
