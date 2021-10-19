/** External Dependencies */
import React from 'react';
import { Layer } from 'react-konva';
import { TRANSFORMER_LAYER_ID } from 'utils/constants';

/** Internal Dependencies */
import NodesTransformer from './NodesTransformer';

const TransformersLayer = () => {
  return (
    <Layer id={TRANSFORMER_LAYER_ID}>
      <NodesTransformer />
    </Layer>
  );
};

export default TransformersLayer;
