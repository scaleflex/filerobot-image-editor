import { useContext, useEffect, useState } from 'react';

import Context from '../context';

const useImageFilter = ({
  filterClassNameInLib,
  valueObject = {},
}) => {
  const {
    appliedFilters,
    updateState
  } = useContext(Context);
  const [value, setValue] = useState(() => valueObject);
  
  useEffect(() => {
    if (filterClassNameInLib) {
      updateState({
        appliedFilters: {
          ...appliedFilters,
          [filterClassNameInLib]: {
            ...appliedFilters[filterClassNameInLib],
            ...value
          }
        }
      })
    }
  }, [value]);

  return [value, setValue];
}

export default useImageFilter;
