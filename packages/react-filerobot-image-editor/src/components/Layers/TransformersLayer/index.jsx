/** External Dependencies */
import React from 'react';
import { Layer } from 'react-konva';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { TOOLS_IDS, TRANSFORMERS_LAYER_ID } from 'utils/constants';
import CropTransformer from './CropTransformer';
import NodesTransformer from './NodesTransformer';

const TransformersLayer = () => {
  const { toolId } = useStore();

  return (
    <Layer id={TRANSFORMERS_LAYER_ID}>
      <NodesTransformer />
      {toolId === TOOLS_IDS.CROP && <CropTransformer />}
    </Layer>
  );
};

export default TransformersLayer;
