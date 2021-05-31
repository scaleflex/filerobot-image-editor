import { lazy } from 'react';

const Crop = lazy(() => import('./Crop'));

const Resize = lazy(() => import('./Resize'));

const Rotate = lazy(() => import('./Rotate'));

export {
  Crop,
  Resize,
  Rotate,
}
