/** External Dependencies */
import React, { useContext } from 'react';

/** Internal Dependencies */
import AppContext from 'context';
import { useDebouncedCallback } from 'hooks';
import { CHANGE_ROTATION, SET_SHOWN_IMAGE_DIMENSIONS } from 'actions';
import restrictNumber from 'utils/restrictNumber';
import getSizeAfterRotation from 'utils/getSizeAfterRotation';
import Slider from 'components/common/Slider';

const sliderStyle = { width: 150, padding: 0 };

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
    const newImageSize = getSizeAfterRotation(
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
    <Slider
      start="-180"
      step="1"
      end="180"
      value={rotation}
      onChange={changeRotation}
      sliderStyle={sliderStyle}
    />
  );
};

export default RotateOptions;
