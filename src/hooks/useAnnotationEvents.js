/** External Dependencies */
import { useContext, useMemo, useCallback } from 'react';

/** Internal Dependencies */
import AppContext from 'context';
import {
  SET_ANNOTATION,
  SELECT_ADDED_ANNOTATION,
  CHANGE_POINTER_ICON,
} from 'actions';
import { POINTER_ICONS, TABS_IDS } from 'utils/constants';

const useAnnotationEvents = () => {
  const { tabId, dispatch } = useContext(AppContext);

  const isAnnotationEventsDisabled = useMemo(
    () => tabId !== TABS_IDS.ANNOTATE,
    [tabId],
  );

  const updateAnnotation = useCallback((annotationProps) => {
    dispatch({
      type: SET_ANNOTATION,
      payload: annotationProps,
    });
  }, []);

  const changePointerIcon = useCallback((newPointerCssIcon) => {
    dispatch({
      type: CHANGE_POINTER_ICON,
      payload: {
        pointerCssIcon: newPointerCssIcon,
      },
    });
  }, []);

  const changePointerIconToMove = useCallback((e) => {
    if (e.target.draggable()) {
      changePointerIcon(POINTER_ICONS.MOVE);
    }
  }, []);

  const changePointerIconToDraw = useCallback(() => {
    changePointerIcon(POINTER_ICONS.DRAW);
  }, []);

  const updatePositionOnDragEnd = useCallback((e) => {
    updateAnnotation({
      id: e.target.id(),
      x: e.target.x(),
      y: e.target.y(),
    });
    setTimeout(() => {
      changePointerIconToMove(e);
    });
  }, []);

  const onTransformStart = useCallback((e) => {
    e.target.setAttr('isTransformedFromAnchor', true);
  }, []);

  const updateTransformsOnTransformEnd = useCallback((e) => {
    updateAnnotation({
      id: e.target.id(),
      scaleX: e.target.scaleX(),
      scaleY: e.target.scaleY(),
      rotation: e.target.rotation(),
    });

    setTimeout(() => {
      e.target.setAttr('isTransformedFromAnchor', false);
    }, 0);
  }, []);

  const selectAnnotationOnClick = useCallback((e) => {
    dispatch({
      type: SELECT_ADDED_ANNOTATION,
      payload: {
        annotationId: e.target.id(),
        multiple: e.evt.ctrlKey,
      },
    });
    changePointerIconToMove(e);
  }, []);

  return useMemo(
    () =>
      isAnnotationEventsDisabled
        ? {}
        : {
            onTransformStart,
            onTransformEnd: updateTransformsOnTransformEnd,
            onMouseOver: changePointerIconToMove,
            onMouseLeave: changePointerIconToDraw,
            onDragEnd: updatePositionOnDragEnd,
            onClick: selectAnnotationOnClick,
            onTap: selectAnnotationOnClick,
          },
    [isAnnotationEventsDisabled],
  );
};

export default useAnnotationEvents;
