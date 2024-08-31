/** External Dependencies */
import React from 'react';
import { Html } from 'react-konva-utils';
import IconButton from '@scaleflex/ui/core/icon-button';
// import { DeleteOutline, Duplicate, LayerOrder } from '@scaleflex/icons';
import DeleteOutline from '@scaleflex/icons/delete-outline';
import Duplicate from '@scaleflex/icons/duplicate';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { DUPLICATE_ANNOTATIONS, REMOVE_ANNOTATIONS } from 'actions';
import { WATERMARK_ANNOTATION_ID } from 'utils/constants';
import { StyledNodeControls } from './NodeControls.styled';

const NodeControls = () => {
  const { selectionsIds = [], dispatch, config = {} } = useStore();
  const selectionsLength = selectionsIds.length;

  if (selectionsLength === 0) return null;

  // TODO: Connect annotation ordering with useAnnotationOrdering hook.
  // const changeAnnotationOrder = () => {};

  const duplicateSelectedNodes = () => {
    dispatch({
      type: DUPLICATE_ANNOTATIONS,
      payload: {
        annotationsIds: selectionsIds,
        onAnnotationAdd: config.onAnnotationAdd,
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

  const nodeControlsTransformFunc = (transformAttrs) => ({
    ...transformAttrs,
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
  });

  return (
    <Html transformFunc={nodeControlsTransformFunc}>
      <StyledNodeControls className="FIE_annotation-controls-overlay">
        {/* {selectionsLength === 1 && (
          <IconButton color="basic" size="sm" onClick={changeAnnotationOrder}>
            <LayerOrder />
          </IconButton>
        )} */}
        {selectionsIds[0] !== WATERMARK_ANNOTATION_ID && (
          <IconButton color="basic" size="sm" onClick={duplicateSelectedNodes}>
            <Duplicate />
          </IconButton>
        )}
        <IconButton color="basic" size="sm" onClick={removeSelectedNodes}>
          <DeleteOutline />
        </IconButton>
      </StyledNodeControls>
    </Html>
  );
};

export default NodeControls;
