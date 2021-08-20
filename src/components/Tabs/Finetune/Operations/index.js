import { lazy } from 'react';

const Brightness = lazy(() => import('./Brightness'));

const Contrast = lazy(() => import('./Contrast'));

const Warmth = lazy(() => import('./Warmth'));

const HSV = lazy(() => import('./HSV'));

const Vignette = lazy(() => import('./Vignette'));

const Blur = lazy(() => import('./Blur'));

const Threshold = lazy(() => import('./Threshold'));

const Posterize = lazy(() => import('./Posterize'));

const Pixelate = lazy(() => import('./Pixelate'));

const Noise = lazy(() => import('./Noise'));

export {
  Brightness,
  Contrast,
  HSV,
  Warmth,
  Vignette,
  Blur,
  Threshold,
  Posterize,
  Pixelate,
  Noise,
};
