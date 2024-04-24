/** External Dependencies */
import React, { useMemo } from 'react';
import { Transformer } from 'react-konva';

/** Internal Dependencies */
import {
  NODES_TRANSFORMER_ID,
  POINTER_ICONS,
  TOOLS_IDS,
} from 'utils/constants';
import { useStore } from 'hooks';
import { CHANGE_POINTER_ICON, ENABLE_TEXT_CONTENT_EDIT } from 'actions';

const RectFocusTransformer = () => {
  const {
    selectionsIds = [],
    theme,
    designLayer,
    dispatch,
    shownImageDimensions,
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

  const enabledAnchors = ['top-center', 'bottom-center'];

  const guideLineColor = theme.palette['accent-primary'];

  // ALT is used to center scaling
  // SHIFT is used to scaling with keeping ratio
  return (
    <Transformer
      id={NODES_TRANSFORMER_ID}
      centeredScaling
      flipEnabled={false}
      rotateEnabled
      keepRatio={false}
      // rotationSnaps={[0, 45, 90, 135, 180, 225, 270, 315]}
      nodes={selections}
      rotateAnchorOffset={30}
      anchorSize={12}
      anchorCornerRadius={6}
      padding={selections.length === 1 ? selections[0].attrs.padding ?? 1 : 1}
      ignoreStroke={false}
      anchorStroke={guideLineColor}
      anchorFill={theme.palette['accent-primary-active']}
      anchorStrokeWidth={2}
      borderStroke={guideLineColor}
      borderStrokeWidth={1}
      borderDash={0}
      onMouseOver={changePointerIconToMove}
      onMouseLeave={changePointerIconToDraw}
      onDblClick={enableTextContentChangeOnDblClick}
      onDblTap={enableTextContentChangeOnDblClick}
      enabledAnchors={enabledAnchors}
      shouldOverdrawWholeArea={false}
    />
  );
};

export default RectFocusTransformer;
