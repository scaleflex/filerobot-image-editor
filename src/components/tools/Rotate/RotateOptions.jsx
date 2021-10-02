/** External Dependencies */
import React, { useContext } from 'react';

/** Internal Dependencies */
import AppContext from 'context';
import { useDebouncedCallback } from 'hooks';
import { CHANGE_ROTATION, SET_SHOWN_IMAGE_DIMENSIONS } from 'actions';
import restrictNumber from 'utils/restrictNumber';
import getRotatedImageSize from 'utils/getRotatedImageSize';

const RotateOptions = () => {
  const {
    dispatch,
    shownImageDimensions,
    adjustments: { rotation = 0 },
  } = useContext(AppContext);

  const changeRotation = useDebouncedCallback((newRotation) => {
    const rotationAngle = restrictNumber(newRotation, -180, 180);
    dispatch({
      type: CHANGE_ROTATION,
      payload: {
        rotation: rotationAngle,
      },
    });
    const newImageSize = getRotatedImageSize(
      shownImageDimensions.width,
      shownImageDimensions.height,
      rotationAngle,
    );
    dispatch({
      type: SET_SHOWN_IMAGE_DIMENSIONS,
      payload: {
        shownImageDimensions: newImageSize,
      },
    });
  }, 20);

  return (
    <div>
      <input
        type="range"
        min="-180"
        step="1"
        value={rotation}
        onChange={changeRotation}
        max="180"
      />
    </div>
  );
};

export default RotateOptions;
