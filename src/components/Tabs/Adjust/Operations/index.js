import { lazy } from 'react';

const Crop = lazy(() => import('./Crop'));

const Resize = lazy(() => import('./Resize'));

const Rotate = lazy(() => import('./Rotate'));

const Flip = lazy(() => import('./Flip'));

export {
  Crop,
  Resize,
  Rotate,
  Flip,
};
