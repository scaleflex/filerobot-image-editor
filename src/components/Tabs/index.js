import { lazy } from 'react';

const Finetune = lazy(() => import('./Finetune'));

const Adjust = lazy(() => import('./Adjust'));

const Annotate = lazy(() => import('./Annotate'));

const Filters = lazy(() => import('./Filters'));

const Watermark = lazy(() => import('./Watermark'));

export {
  Finetune,
  Adjust,
  Annotate,
  Filters,
  Watermark,
}
