export const ADD_PREVIEW_LAYER_REF = 'ADD_PREVIEW_LAYER_REF';

const addPreviewLayerRef = (state, payload) => ({
  ...state,
  previewLayer: payload.previewLayer,
});

export default addPreviewLayerRef;
