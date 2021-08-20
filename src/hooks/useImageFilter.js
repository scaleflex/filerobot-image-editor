import {
  useCallback, useContext, useMemo, useState,
} from 'react';
import Konva from 'konva';

import Context from 'context';
import * as CustomKonvaFilters from 'custom/filters';

const useImageFilter = () => {
  const { canvasedImage } = useContext(Context);
  const currentFilterName = useMemo(() => (
    (
      (
        canvasedImage.filters() || []
      ).filter((f) => f.isImageFilter)[0] || {}
    ).name
  ), [canvasedImage]);
  const [appliedFilter, setAppliedFilter] = useState(() => currentFilterName);

  const applyFilter = useCallback((
    filterClassName,
    filterName,
  ) => {
    if (canvasedImage) {
      const currentFilters = canvasedImage.filters() || [];
      const uniqueFilters = currentFilters.filter(
        (filter) => !filter.isImageFilter && filter.name !== filterClassName,
      );
      const filterFn = Konva.Filters[filterClassName] ?? CustomKonvaFilters[filterClassName];

      if (filterFn) {
        filterFn.isImageFilter = true; // used in removing any previous image filter applied.
        uniqueFilters.push(filterFn);
      }

      canvasedImage.filters(uniqueFilters);

      setAppliedFilter(filterName);
    }
  }, [canvasedImage]);

  return [appliedFilter, applyFilter];
};

export default useImageFilter;
