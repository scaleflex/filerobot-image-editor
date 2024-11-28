/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { TOOLS_IDS } from 'utils/constants';
import CropTransformer from './CropTransformer';
import NodesTransformer from './NodesTransformer';
import TransformersLayerWrapper from './TransformersLayerWrapper';

const TransformersLayer = ({ onClickAnnotationDelete }) => {
  const { toolId } = useStore();

  return (
    <TransformersLayerWrapper>
      <NodesTransformer onClickAnnotationDelete={onClickAnnotationDelete} />
      {toolId === TOOLS_IDS.CROP && <CropTransformer />}
    </TransformersLayerWrapper>
  );
};

TransformersLayer.propTypes = {
  onClickAnnotationDelete: PropTypes.func,
};

export default TransformersLayer;
