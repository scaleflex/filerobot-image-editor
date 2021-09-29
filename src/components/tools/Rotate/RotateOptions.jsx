/** External Dependencies */
import React, { useContext } from 'react';

/** Internal Dependencies */
import AppContext from 'context';
import { useDebouncedCallback } from 'hooks';
import { ROTATE_CANVAS } from 'actions';
import restrictNumber from 'utils/restrictNumber';

const RotateOptions = () => {
  const {
    dispatch,
    adjustments: {
      rotation = 0,
    },
  } = useContext(AppContext);

  const changeRotation = useDebouncedCallback(
    (newRotation) => {
      dispatch({
        type: ROTATE_CANVAS,
        payload: {
          rotation: restrictNumber(newRotation, -180, 180),
        },
      });
    },
    20,
  );

  return (
    <div>
      <input type="range" min="-180" step="1" value={rotation} onChange={changeRotation} max="180" />
    </div>
  );
};

export default RotateOptions;
