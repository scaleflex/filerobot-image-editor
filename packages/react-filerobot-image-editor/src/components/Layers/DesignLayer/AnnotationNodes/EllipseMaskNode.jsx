/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Ellipse } from 'react-konva';

/** Internal Dependencies */
import nodesCommonPropTypes from '../nodesCommonPropTypes';

const EllipseMaskNode = ({
  id,
  name,
  x,
  y,
  radiusX,
  radiusY,
  scaleX,
  scaleY,
  rotation,
  annotationEvents,
  opacity,
  fill,
  ...otherProps
}) => (
  <Ellipse
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
    radiusX={radiusX}
    radiusY={radiusY}
    offsetX={-radiusX}
    offsetY={-radiusY}
    opacity={opacity}
    {...annotationEvents}
    {...otherProps}
    globalCompositeOperation='destination-in'
  />
);

EllipseMaskNode.defaultProps = {
  ...nodesCommonPropTypes.defaults,
  fill: '#000',
  radiusX: 0,
  radiusY: 0,
};

EllipseMaskNode.propTypes = {
  ...nodesCommonPropTypes.definitions,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  annotationEvents: PropTypes.instanceOf(Object).isRequired,
  radiusX: PropTypes.number,
  radiusY: PropTypes.number,
  fill: PropTypes.string,
};

export default EllipseMaskNode;
