import { useContext, useEffect, useState } from 'react';

import Context from '../context';

const useImageFilter = ({
  filterClassNameInLib,
  valueObject = {},
}) => {
  const {
    finetune,
    updateState
  } = useContext(Context);
  const [value, setValue] = useState(() => valueObject);
  
  useEffect(() => {
    if (filterClassNameInLib) {
      updateState({
        finetune: {
          ...finetune,
          [filterClassNameInLib]: {
            ...finetune[filterClassNameInLib],
            ...value
          }
        }
      })
    }
  }, [value]);

  return [value, setValue];
}

export default useImageFilter;
