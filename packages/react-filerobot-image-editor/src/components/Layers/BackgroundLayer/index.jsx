/** External Dependencies */
import React from 'react';
import { Rect } from 'react-konva';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { BACKGROUND_LAYER_ID } from 'utils/constants';

const BackgroundLayer = () => {
  const { canvasWidth, canvasHeight, config } = useStore();
console.log('!!!', config)
  if (!config.fill || config.fill === 'white') return null;

  return (
    <Rect
      id={BACKGROUND_LAYER_ID}
      x={0}
      y={0}
      width={canvasWidth}
      height={canvasHeight}
      fill={config.fill}
    />
  );
};

export default BackgroundLayer;
