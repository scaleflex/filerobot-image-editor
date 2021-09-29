/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-konva';

const ImageNode = ({
  id, name, image, x, y, width, height, scaleX, scaleY, rotation, annotationEvents,
  stroke, strokeWidth, ...otherProps
}) => (
  <Image
    id={id}
    name={name}
    image={image}
    x={x}
    y={y}
    width={width}
    height={height}
    scaleX={scaleX}
    scaleY={scaleY}
    stroke={stroke}
    strokeWidth={strokeWidth}
    rotation={rotation}
    {...annotationEvents}
    {...otherProps}
  />
);

ImageNode.defaultProps = {
  rotation: 0,
  width: 0,
  height: 0,
  scaleX: 1,
  scaleY: 1,
  stroke: '#000',
  strokeWidth: 0,
};

ImageNode.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([
    PropTypes.instanceOf(HTMLImageElement),
    PropTypes.instanceOf(SVGImageElement),
    PropTypes.instanceOf(HTMLVideoElement),
    PropTypes.instanceOf(ImageBitmap),
  ]).isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  annotationEvents: PropTypes.instanceOf(Object).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  rotation: PropTypes.number,
  scaleX: PropTypes.number,
  scaleY: PropTypes.number,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
};

export default ImageNode;
