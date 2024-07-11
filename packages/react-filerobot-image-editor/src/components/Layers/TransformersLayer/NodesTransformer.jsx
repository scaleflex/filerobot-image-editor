/** External Dependencies */
import React, { useEffect, useState } from 'react';
import { Transformer } from 'react-konva';

/** Internal Dependencies */
import {
  NODES_TRANSFORMER_ID,
  POINTER_ICONS,
  TOOLS_IDS,
} from 'utils/constants';
import { useStore } from 'hooks';
import { CHANGE_POINTER_ICON, ENABLE_TEXT_CONTENT_EDIT } from 'actions';
import debounce from 'utils/debounce';

let isUnMounted = false;

const NodesTransformer = () => {
  const {
    selectionsIds = [],
    theme,
    designLayer,
    dispatch,
    config: { useCloudimage },
  } = useStore();
  const [selections, setSelections] = useState([]);

  const updateSelectionNodes = debounce(() => {
    if (isUnMounted) {
      return;
    }

    const newSelections =
      designLayer?.findOne && selectionsIds.length > 0
        ? selectionsIds
            .map((selectionId) => designLayer.findOne(`#${selectionId}`))
            .filter(Boolean)
        : [];

    setSelections(newSelections);
  }, 5);

  const changePointerIconToMove = () => {
    dispatch({
      type: CHANGE_POINTER_ICON,
      payload: {
        pointerCssIcon: POINTER_ICONS.MOVE,
      },
    });
  };

  const changePointerIconToDraw = () => {
    dispatch({
      type: CHANGE_POINTER_ICON,
      payload: {
        pointerCssIcon: POINTER_ICONS.DRAW,
      },
    });
  };

  const enableTextContentChangeOnDblClick = () => {
    if (selections.length === 1 && selections[0].name() === TOOLS_IDS.TEXT) {
      dispatch({
        type: ENABLE_TEXT_CONTENT_EDIT,
        payload: {
          textIdOfEditableContent: selections[0].id(),
        },
      });
    }
  };

  useEffect(() => {
    isUnMounted = false;

    return () => {
      isUnMounted = true;
    };
  }, []);

  useEffect(() => {
    if (!isUnMounted) {
      updateSelectionNodes();
    }
  }, [selectionsIds]);

  const enabledAnchors = useCloudimage
    ? ['top-left', 'bottom-left', 'top-right', 'bottom-right']
    : undefined;

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
      rotateEnabled={!useCloudimage}
      onMouseOver={changePointerIconToMove}
      onMouseLeave={changePointerIconToDraw}
      onDblClick={enableTextContentChangeOnDblClick}
      onDblTap={enableTextContentChangeOnDblClick}
      enabledAnchors={enabledAnchors}
      flipEnabled={
        !useCloudimage &&
        !selections.some(
          ({ attrs: { name } = {} } = {}) => name === TOOLS_IDS.TEXT,
        )
      }
      shouldOverdrawWholeArea
    />
  );
};

export default NodesTransformer;
