/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-konva';

/** Internal Dependencies */
import nodesCommonPropTypes from '../nodesCommonPropTypes';

const LineNode = ({
  id,
  name,
  scaleX = 1,
  scaleY = 1,
  rotation = 0,
  annotationEvents = {},
  points,
  lineCap = 'butt',
  stroke = '#000000',
  strokeWidth = 1,
  shadowOffsetX,
  shadowOffsetY,
  shadowBlur,
  shadowColor,
  shadowOpacity,
  tension,
  opacity = 1,
  ...otherProps
}) => (
  <Line
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
    points={points}
    lineCap={lineCap}
    tension={tension}
    hitStrokeWidth={20}
    x={0}
    y={0}
    opacity={opacity}
    {...annotationEvents}
    {...otherProps}
  />
);

LineNode.propTypes = {
  ...nodesCommonPropTypes.definitions,
  points: PropTypes.instanceOf(Array).isRequired,
  annotationEvents: PropTypes.instanceOf(Object),
  lineCap: PropTypes.string,
  tension: PropTypes.number,
};

export default LineNode;
