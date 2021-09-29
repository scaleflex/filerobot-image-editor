/** External Dependencies */
import { useContext, useMemo, useCallback } from 'react';

/** Internal Dependencies */
import AppContext from 'context';
import { SET_ANNOTATION, SELECT_ADDED_ANNOTATION, CHANGE_POINTER_MODE } from 'actions';
import { POINTER_MODES, TABS_IDS } from 'utils/constants';

const useAnnotationEvents = () => {
  const { tab, pointerMode, dispatch } = useContext(AppContext);

  const isAnnotationEventsDisabled = useMemo(
    () => tab?.id !== TABS_IDS.ANNOTATE
      || (
        pointerMode !== POINTER_MODES.SELECT
        && pointerMode !== POINTER_MODES.GRAB
      ),
    [pointerMode, tab],
  );

  const updateAnnotation = useCallback((annotationProps) => {
    dispatch({
      type: SET_ANNOTATION,
      payload: annotationProps,
    });
  }, []);

  const updatePositionOnDragEnd = useCallback((e) => {
    updateAnnotation({
      id: e.target.id(),
      x: e.target.x(),
      y: e.target.y(),
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
  }, []);

  const changePointerMode = useCallback((mode) => {
    dispatch({
      type: CHANGE_POINTER_MODE,
      payload: {
        mode,
      },
    });
  }, []);

  const pointerModeToGrabOnHover = useCallback(() => {
    changePointerMode(POINTER_MODES.GRAB);
  }, []);

  const pointerModeToSelectOnLeave = useCallback(() => {
    changePointerMode(POINTER_MODES.SELECT);
  }, []);

  return useMemo(
    () => (
      isAnnotationEventsDisabled
        ? {}
        : ({
          onTransformStart,
          onTransformEnd: updateTransformsOnTransformEnd,
          onMouseOver: pointerModeToGrabOnHover,
          onMouseLeave: pointerModeToSelectOnLeave,
          onDragEnd: updatePositionOnDragEnd,
          onClick: selectAnnotationOnClick,
          onTap: selectAnnotationOnClick,
          draggable: true,
        })
    ),
    [isAnnotationEventsDisabled],
  );
};

export default useAnnotationEvents;
