import { useContext, useEffect, useState } from 'react';
import Konva from 'konva';

import Context from 'context';
import * as CustomKonvaFilters from 'custom/filters';

const useFinetuneFilter = ({
  filterClassNameInLib,
  valueObject = {},
}) => {
  const { canvasedImage } = useContext(Context);
  // Assign the already set value to the state if there is no value yet assign the default provided one.
  const [value, setValue] = useState(() => {
    const finalValue = {};
    Object.keys(valueObject).forEach((key) => {
      finalValue[key] = canvasedImage.attrs[key] ?? valueObject[key];
    });
    return finalValue;
  });

  const updateValue = (newValue) => {
    setValue({
      ...value,
      ...newValue,
    });
  };

  useEffect(() => {
    if (canvasedImage && filterClassNameInLib) {
      const currentFilters = canvasedImage.filters() || [];
      const doesFilterExist = currentFilters.some((filter) => filter.name === filterClassNameInLib);
      if (!doesFilterExist) {
        canvasedImage.filters([
          ...currentFilters,
          Konva.Filters[filterClassNameInLib] ?? CustomKonvaFilters[filterClassNameInLib],
        ]);
      }
    }
  }, [canvasedImage, filterClassNameInLib]);

  useEffect(() => {
    Object.keys(value).forEach((filterValueFnName) => {
      const filterValue = value[filterValueFnName];
      if (canvasedImage.attrs[filterValueFnName] !== filterValue) {
        canvasedImage[filterValueFnName](filterValue);
      }
    });
  }, [canvasedImage, value]);

  return [value, updateValue];
};

export default useFinetuneFilter;
