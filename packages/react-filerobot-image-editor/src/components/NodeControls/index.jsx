/** External Dependencies */
import React, { useEffect, useMemo, useState } from 'react';
import IconButton from '@scaleflex/ui/core/icon-button';
// import { DeleteOutline, Duplicate, LayerOrder } from '@scaleflex/icons';
import DeleteOutline from '@scaleflex/icons/delete-outline';
import Duplicate from '@scaleflex/icons/duplicate';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { DUPLICATE_ANNOTATIONS, REMOVE_ANNOTATIONS } from 'actions';
import { NODES_TRANSFORMER_ID, WATERMARK_ANNOTATION_ID } from 'utils/constants';
import debounce from 'utils/debounce';
import { StyledNodeControls } from './NodeControls.styled';

const NodeControls = () => {
  const { selectionsIds = [], designLayer, annotations, dispatch } = useStore();
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const nodesTransformer = useMemo(
    () => designLayer?.getStage()?.findOne(`#${NODES_TRANSFORMER_ID}`),
    [designLayer],
  );
  const selectionsLength = selectionsIds.length;

  const updatePosition = debounce(() => {
    if (!nodesTransformer) {
      return;
    }
    setPosition({
      left:
        (nodesTransformer.x() + nodesTransformer.width() / 2) *
        nodesTransformer.scaleX(),
      top:
        (nodesTransformer.y() + nodesTransformer.height()) *
        nodesTransformer.scaleY(),
    });
  }, 0);

  useEffect(() => {
    updatePosition();
  }, [selectionsIds, nodesTransformer, annotations]);

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
      className="FIE_annotation-controls-overlay"
      left={position.left}
      top={position.top}
    >
      {/* {selectionsLength === 1 && (
        <IconButton color="link" size="sm" onClick={changeAnnotationOrder}>
          <LayerOrder />
        </IconButton>
      )} */}
      {selectionsIds[0] !== WATERMARK_ANNOTATION_ID && (
        <IconButton color="link" size="sm" onClick={duplicateSelectedNodes}>
          <Duplicate />
        </IconButton>
      )}
      <IconButton color="link" size="sm" onClick={removeSelectedNodes}>
        <DeleteOutline />
      </IconButton>
    </StyledNodeControls>
  );
};

export default NodeControls;
