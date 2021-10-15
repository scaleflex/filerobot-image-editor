/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';

/** Internal Dependencies */
import LineNode from './LineNode';
import nodesCommonPropTypes from '../nodesCommonPropTypes';

const PenNode = ({
  id,
  name,
  scaleX,
  scaleY,
  rotation,
  annotationEvents,
  lineCap,
  lines,
  tension,
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
  <Group
    id={id}
    name={name}
    scaleX={scaleX}
    scaleY={scaleY}
    rotation={rotation}
    opacity={opacity}
    {...annotationEvents}
    {...otherProps}
  >
    {lines.map((line) => (
      <LineNode
        key={line.id}
        name={line.name}
        stroke={stroke}
        strokeWidth={strokeWidth}
        shadowOffsetX={shadowOffsetX}
        shadowOffsetY={shadowOffsetY}
        shadowBlur={shadowBlur}
        shadowColor={shadowColor}
        shadowOpacity={shadowOpacity}
        lineCap={lineCap}
        tension={tension}
        {...line}
      />
    ))}
  </Group>
);

PenNode.defaultProps = {
  ...nodesCommonPropTypes.defaults,
  lineCap: 'round',
  tension: 0.5,
};

PenNode.propTypes = {
  ...nodesCommonPropTypes.definitions,
  lines: PropTypes.instanceOf(Array).isRequired,
  annotationEvents: PropTypes.instanceOf(Object).isRequired,
  lineCap: PropTypes.string,
  tension: PropTypes.number,
};

export default PenNode;
