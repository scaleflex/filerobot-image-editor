/** External Dependencies */
import React from 'react';
import { Layer } from 'react-konva';

/** Internal Dependencies */
import NodesTransformer from './NodesTransformer';

const TransformersLayer = () => {
  return (
    <Layer>
      <NodesTransformer />
    </Layer>
  );
};

export default TransformersLayer;
