/** External Dependencies */
import React from 'react';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { TOOLS_IDS } from 'utils/constants';
import CropTransformer from './CropTransformer';
import NodesTransformer from './NodesTransformer';
import TransformersLayerWrapper from './TransformersLayerWrapper';

const TransformersLayer = () => {
  const { toolId } = useStore();

  return (
    <TransformersLayerWrapper>
      <NodesTransformer />
      {toolId === TOOLS_IDS.CROP && <CropTransformer />}
    </TransformersLayerWrapper>
  );
};

export default TransformersLayer;
