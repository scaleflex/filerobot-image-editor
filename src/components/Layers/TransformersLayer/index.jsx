/** External Dependencies */
import AppContext from 'context';
import React, { useContext } from 'react';
import { Layer } from 'react-konva';
import { TOOLS_IDS, TRANSFORMER_LAYER_ID } from 'utils/constants';
import CropTransformer from './CropTransformer';

/** Internal Dependencies */
import NodesTransformer from './NodesTransformer';

const TransformersLayer = () => {
  const { toolId } = useContext(AppContext);

  return (
    <Layer id={TRANSFORMER_LAYER_ID}>
      <NodesTransformer />
      {toolId === TOOLS_IDS.CROP && <CropTransformer />}
    </Layer>
  );
};

export default TransformersLayer;
