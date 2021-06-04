import { useRef, useContext, useEffect, useState } from 'react';
import { fabric } from 'fabric';

import AppContext from '../AppContext';
import upperCaseFirstLetter from '../utils/upperCaseFirstLetter';

const useImageFilter = ({
  stateFilterName = '', // stateFilterName: must be the same as the filter's name in fabric regardless (1st) letter case
  propertyNameInFabricClass = '',
  filterClassNameInFabric,
  defaultValue = 0,
  defaultProperties = {},
  noProperty = false
}) => {
  const {
    appliedFilters,
    updateState
  } = useContext(AppContext);
  const [value, setValue] = useState(() => defaultValue);

  const filterObjectNameInFabric = useRef(
    filterClassNameInFabric || upperCaseFirstLetter(stateFilterName)
  );
  
  useEffect(() => {
    if (filterObjectNameInFabric?.current) {
      updateState({
        appliedFilters: {
          ...appliedFilters,
          [stateFilterName]: new fabric.Image.filters[filterObjectNameInFabric.current](
            !noProperty ? {
              ...defaultProperties,
              [propertyNameInFabricClass || stateFilterName]: value
            }
            : undefined
          )
        }
      })
    }
  }, [value]);

  return [value, setValue];
}

export default useImageFilter;
