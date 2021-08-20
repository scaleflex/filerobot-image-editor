import React, { useCallback, useContext } from 'react';

import Context from 'context';
import { AdjustOperationWrapper } from './Operations.styled';

const Rotate = () => {
  const { canvas } = useContext(Context);

  const changeRotation = useCallback((e) => {
    let rotationTheta = +e.target.value;
    rotationTheta = rotationTheta > 360 ? 360 : rotationTheta;
    rotationTheta = rotationTheta < 0 ? 0 : rotationTheta;

    canvas.rotation(rotationTheta);
  }, [canvas]);

  return (
    <AdjustOperationWrapper>
      <input type="range" min="0" max="360" onChange={changeRotation} />
    </AdjustOperationWrapper>
  );
};

export default Rotate;
