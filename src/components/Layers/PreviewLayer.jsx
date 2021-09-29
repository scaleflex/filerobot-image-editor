/** External Dependencies */
import React, { useContext, useEffect, useRef } from 'react';
import { Layer } from 'react-konva';

/** Internal Dependencies */
import { ADD_PREVIEW_LAYER_REF } from 'actions';
import AppContext from 'context';

// Since we don't really care for the preview layer's state,
// We directly pass the previewing shapes to it directly without changing state.
const ImageLayer = () => {
  const { dispatch, shownImageDimensions = {} } = useContext(AppContext);
  const previewLayerRef = useRef();

  useEffect(() => {
    if (previewLayerRef.current) {
      dispatch({
        type: ADD_PREVIEW_LAYER_REF,
        payload: {
          previewLayer: previewLayerRef.current,
        },
      });
    }
  }, []);

  const clipTo = {
    ...shownImageDimensions,
    x: 0,
    y: 0,
  };

  return (
    <Layer
      ref={previewLayerRef}
      x={shownImageDimensions.x || 0}
      y={shownImageDimensions.y || 0}
      clip={clipTo}
    />
  );
};

export default ImageLayer;
