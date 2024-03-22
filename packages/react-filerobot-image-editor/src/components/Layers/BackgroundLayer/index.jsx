/** External Dependencies */
import React from 'react';
import { Layer, Rect } from 'react-konva';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { BACKGROUND_LAYER_ID } from 'utils/constants';

const BackgroundLayer = () => {
  const { canvasWidth, canvasHeight, config } = useStore();

  if (!config.fill || config.fill === 'white') return null;

  return (
    <Layer id={BACKGROUND_LAYER_ID}>
      <Rect
        x={0}
        y={0}
        width={canvasWidth}
        height={canvasHeight}
        fill={config.fill}
      />
    </Layer>
  );
};

export default BackgroundLayer;
