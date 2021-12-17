/** External Dependencies */
import React from 'react';
import { Layer } from 'react-konva';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { TOOLS_IDS, TRANSFORMERS_LAYER_ID } from 'utils/constants';
import CropTransformer from './CropTransformer';
import NodesTransformer from './NodesTransformer';

const TransformersLayer = () => {
  const { toolId, shownImageDimensions } = useStore();

  return (
    <Layer
      id={TRANSFORMERS_LAYER_ID}
      x={shownImageDimensions.abstractX || 0}
      y={shownImageDimensions.abstractY || 0}
    >
      <NodesTransformer />
      {toolId === TOOLS_IDS.CROP && <CropTransformer />}
    </Layer>
  );
};

export default TransformersLayer;
