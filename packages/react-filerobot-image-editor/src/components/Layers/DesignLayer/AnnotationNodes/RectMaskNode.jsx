/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Rect } from 'react-konva';

/** Internal Dependencies */
import nodesCommonPropTypes from '../nodesCommonPropTypes';

const RectMaskNode = ({
  id,
  name,
  x,
  y,
  width,
  height,
  scaleX,
  scaleY,
  rotation,
  annotationEvents,
  opacity,
  fill,
  ...otherProps
}) => (
  <Rect
    id={id}
    name={name}
    rotation={rotation}
    scaleX={scaleX}
    scaleY={scaleY}
    strokeWidth={0}
    shadowOpacity={0}
    fill='#000000'
    x={x}
    y={y}
    width={width}
    height={height}
    opacity={opacity}
    {...annotationEvents}
    {...otherProps}
    globalCompositeOperation='destination-out'
  />
);

RectMaskNode.defaultProps = {
  ...nodesCommonPropTypes.defaults,
  width: 0,
  height: 0,
};

RectMaskNode.propTypes = {
  ...nodesCommonPropTypes.definitions,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  annotationEvents: PropTypes.instanceOf(Object).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default RectMaskNode;
