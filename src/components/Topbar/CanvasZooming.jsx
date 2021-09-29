/** External Dependencies */
import React, { useCallback, useContext } from 'react';
import { Minus, Plus } from '@scaleflex/icons';
import { Label } from '@scaleflex/ui/core';

/** Internal Dependencies */
import AppContext from 'context';
import { ZOOM_CANVAS } from 'actions';
import { StyledSmallButton } from './Topbar.styles';

const CanvasZooming = () => {
  const {
    dispatch,
    zoom = {},
  } = useContext(AppContext);

  const zoomIn = useCallback(() => {
    dispatch({
      type: ZOOM_CANVAS,
      payload: {
        zoomBy: 0.2,
      },
    });
  }, []);

  const zoomOut = useCallback(() => {
    dispatch({
      type: ZOOM_CANVAS,
      payload: {
        zoomBy: -0.1,
      },
    });
  }, []);

  return (
    <>
      <StyledSmallButton
        onClick={zoomOut}
        color="link"
      >
        <Minus />
      </StyledSmallButton>
      <Label>{`${parseInt(zoom.factor * 100, 10)}%`}</Label>
      <StyledSmallButton
        onClick={zoomIn}
        color="link"
      >
        <Plus />
      </StyledSmallButton>
    </>
  );
};

export default CanvasZooming;
