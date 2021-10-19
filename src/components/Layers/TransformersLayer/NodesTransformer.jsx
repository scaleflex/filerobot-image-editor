/** External Dependencies */
import React, { useContext, useMemo } from 'react';
import { Transformer } from 'react-konva';

/** Internal Dependencies */
import AppContext from 'context';

const NodesTransformer = () => {
  const { selectionsIds = [], theme, designLayer } = useContext(AppContext);

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
      centeredScaling={false}
      rotationSnaps={[0, 45, 90, 135, 180, 225, 270, 315]}
      nodes={selections}
      rotateAnchorOffset={30}
      anchorSize={14}
      anchorCornerRadius={7}
      padding={1}
      ignoreStroke={false}
      anchorStroke={theme.palette['accent-primary']}
      anchorFill={theme.palette['access-primary']}
      anchorStrokeWidth={2}
      borderStroke={theme.palette['accent-primary']}
      borderStrokeWidth={2}
      borderDash={[4]}
      flipEnabled
    />
  );
};

export default NodesTransformer;
