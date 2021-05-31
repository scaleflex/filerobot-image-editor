import { lazy } from 'react';

const Brightness = lazy(() => import('./Brightness'));

const Contrast = lazy(() => import('./Contrast'));

const Warmth = lazy(() => import('./Warmth'));

const Saturation = lazy(() => import('./Saturation'));

const Vignette = lazy(() => import('./Vignette'));

const Blur = lazy(() => import('./Blur'));

export {
  Brightness,
  Contrast,
  Saturation,
  Warmth,
  Vignette,
  Blur,
}
