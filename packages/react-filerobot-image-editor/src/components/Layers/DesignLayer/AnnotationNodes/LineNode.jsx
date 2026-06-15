/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-konva';

/** Internal Dependencies */
import nodesCommonPropTypes from '../nodesCommonPropTypes';

const LineNode = ({
  stroke = '#000000',
  strokeWidth = 1,
  lineCap = 'butt', // butt/round/square
  annotationEvents = {},
  tension = undefined,

  id,
  name,
  scaleX,
  scaleY,
  rotation,
  points,
  shadowOffsetX,
  shadowOffsetY,
  shadowBlur,
  shadowColor,
  shadowOpacity,
  opacity,
  ...otherProps
}) => (
  <Line
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
