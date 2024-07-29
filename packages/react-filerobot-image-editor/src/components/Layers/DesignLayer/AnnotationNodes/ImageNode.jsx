/** External Dependencies */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-konva';

/** Internal Dependencies */
import loadImage from 'utils/loadImage';
import nodesCommonPropTypes from '../nodesCommonPropTypes';

const ImageNode = ({
  id,
  name,
  image,
  x,
  y,
  width = 0,
  height = 0,
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
}) => {
  const [imgElement, setImgElement] = useState(null);
  useEffect(() => {
    if (typeof image === 'string') {
      loadImage(image).then(setImgElement);
    }
  }, [image]);

  const isImgElement =
    image instanceof HTMLImageElement || image instanceof HTMLCanvasElement;
  if (!isImgElement && !imgElement) {
    return null;
  }

  const finalImg = isImgElement ? image : imgElement;

  return (
    <Image
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
      image={finalImg}
      x={x || 0}
      y={y || 0}
      width={width}
      height={height}
      opacity={opacity || 0}
      {...otherProps}
      {...annotationEvents}
      {...otherProps}
    />
  );
};

ImageNode.propTypes = {
  ...nodesCommonPropTypes.definitions,
  image: PropTypes.oneOfType([
    PropTypes.instanceOf(HTMLImageElement),
    PropTypes.instanceOf(SVGImageElement),
    PropTypes.instanceOf(HTMLCanvasElement),
    // PropTypes.instanceOf(HTMLVideoElement),
    PropTypes.instanceOf(ImageBitmap),
    PropTypes.string,
  ]).isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  annotationEvents: PropTypes.instanceOf(Object).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default ImageNode;
