/** External Dependencies */
import React from 'react';
import { Layer } from 'react-konva';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { TRANSFORMERS_LAYER_ID } from 'utils/constants';

const TransformersLayerWrapper = ({ children }) => {
  const { shownImageDimensions } = useStore();

  return (
    <Layer
      id={TRANSFORMERS_LAYER_ID}
      x={shownImageDimensions.abstractX || 0}
      y={shownImageDimensions.abstractY || 0}
    >
      {children}
    </Layer>
  );
};

TransformersLayerWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TransformersLayerWrapper;
