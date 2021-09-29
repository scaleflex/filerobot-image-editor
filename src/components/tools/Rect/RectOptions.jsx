/** External Dependencies */
import React from 'react';
import Konva from 'konva';

/** Internal Dependencies */
import { useAnnotation } from 'hooks';
import { ANNOTATIONS_NAMES } from 'utils/constants';

const RectOptions = () => {
  const [rect, updateRect] = useAnnotation({
    name: ANNOTATIONS_NAMES.RECT,
  });

  const changeRect = (e) => {
    updateRect({
      fill: e.target.value,
    });
  };

  return (
    <input
      type="color"
      onChange={changeRect}
    />
  );
};

export default RectOptions;
