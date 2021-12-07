/** External Dependencies */
import React, { useMemo } from 'react';
import { Transformer } from 'react-konva';

/** Internal Dependencies */
import { NODES_TRANSFORMER_ID } from 'utils/constants';
import { useStore } from 'hooks';

const NodesTransformer = () => {
  const {
    selectionsIds = [],
    theme,
    designLayer,
    config: { useCloudimage },
  } = useStore();

  const selections = useMemo(
    () =>
      designLayer?.findOne
        ? selectionsIds
            .map((selectionId) => designLayer.findOne(`#${selectionId}`))
            .filter(Boolean)
        : [],
    [selectionsIds],
  );

  // ALT is used to center scaling
  // SHIFT is used to scaling with keeping ratio
  return (
    <Transformer
      id={NODES_TRANSFORMER_ID}
      centeredScaling={false}
      rotationSnaps={[0, 45, 90, 135, 180, 225, 270, 315]}
      nodes={selections}
      rotateAnchorOffset={30}
      anchorSize={14}
      anchorCornerRadius={7}
      padding={selections.length === 1 ? selections[0].attrs.padding ?? 1 : 1}
      ignoreStroke={false}
      anchorStroke={theme.palette['accent-primary']}
      anchorFill={theme.palette['access-primary']}
      anchorStrokeWidth={2}
      borderStroke={theme.palette['accent-primary']}
      borderStrokeWidth={2}
      borderDash={[4]}
      flipEnabled
      rotateEnabled={!useCloudimage}
    />
  );
};

export default NodesTransformer;
