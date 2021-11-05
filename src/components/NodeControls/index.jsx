/** External Dependencies */
import React, { useMemo } from 'react';
import { IconButton } from '@scaleflex/ui/core';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { DUPLICATE_ANNOTATIONS, REMOVE_ANNOTATIONS } from 'actions';
// import { Duplicate, LayerOrder, Remove } from 'components/common/icons';
import { Duplicate, Remove } from 'components/common/icons';
import { NODES_TRANSFORMER_ID } from 'utils/constants';
import { StyledNodeControls } from './NodeControls.styled';

const NodeControls = () => {
  const { selectionsIds = [], designLayer, dispatch } = useStore();
  const nodesTransformer = useMemo(
    () => designLayer?.getStage()?.findOne(`#${NODES_TRANSFORMER_ID}`),
    [designLayer],
  );
  const selectionsLength = selectionsIds.length;

  if (selectionsLength === 0 || !nodesTransformer) return null;

  // TODO: Implemenet annotation ordering.
  // const changeAnnotationOrder = () => {};

  const duplicateSelectedNodes = () => {
    dispatch({
      type: DUPLICATE_ANNOTATIONS,
      payload: {
        annotationsIds: selectionsIds,
      },
    });
  };

  const removeSelectedNodes = () => {
    dispatch({
      type: REMOVE_ANNOTATIONS,
      payload: {
        annotationsIds: selectionsIds,
      },
    });
  };

  return (
    <StyledNodeControls
      left={
        (nodesTransformer.x() + nodesTransformer.width() / 2) *
        nodesTransformer.scaleX()
      }
      top={
        (nodesTransformer.y() + nodesTransformer.height()) *
        nodesTransformer.scaleY()
      }
    >
      {/* {selectionsLength === 1 && (
        <IconButton color="link" size="sm" onClick={changeAnnotationOrder}>
          <LayerOrder />
        </IconButton>
      )} */}
      <IconButton color="link" size="sm" onClick={duplicateSelectedNodes}>
        <Duplicate />
      </IconButton>
      <IconButton color="link" size="sm" onClick={removeSelectedNodes}>
        <Remove />
      </IconButton>
    </StyledNodeControls>
  );
};

export default NodeControls;
