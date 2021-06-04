import { lazy } from 'react';

const Brightness = lazy(() => import('./Brightness'));

const Contrast = lazy(() => import('./Contrast'));

const Warmth = lazy(() => import('./Warmth'));

const Saturation = lazy(() => import('./Saturation'));

const Vignette = lazy(() => import('./Vignette'));

const Blur = lazy(() => import('./Blur'));

const Grayscale = lazy(() => import('./Grayscale'));

export {
  Brightness,
  Contrast,
  Saturation,
  Warmth,
  Vignette,
  Blur,
  Grayscale,
}
