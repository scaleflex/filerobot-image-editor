/** External Dependencies */
import React from 'react';

/** Internal Dependencies */
import { useDebouncedCallback, useStore } from 'hooks';
import { CHANGE_ROTATION, SET_RESIZE } from 'actions';
import restrictNumber from 'utils/restrictNumber';
import getSizeAfterRotation from 'utils/getSizeAfterRotation';
import Slider from 'components/common/Slider';

const RotateOptions = () => {
  const {
    dispatch,
    adjustments: { rotation = 0 },
    resize = {},
  } = useStore();

  const changeRotation = useDebouncedCallback((newRotation) => {
    if (rotation === newRotation) {
      return;
    }
    const rotationAngle = restrictNumber(newRotation, -180, 180);
    dispatch({
      type: CHANGE_ROTATION,
      payload: {
        rotation: rotationAngle,
      },
    });

    if (resize.width && resize.height) {
      const sizeAfterRotation = getSizeAfterRotation(
        resize.width,
        resize.height,
        rotationAngle,
      );
      dispatch({
        type: SET_RESIZE,
        payload: {
          width: sizeAfterRotation.width,
          height: sizeAfterRotation.height,
        },
      });
    }
  }, 20);

  return (
    <Slider
      min={-180}
      step={1}
      max={180}
      value={rotation}
      onChange={changeRotation}
      annotation="°"
      width="100%"
      hideTrack
    />
  );
};

export default RotateOptions;
