/** External Dependencies */
import { useEffect, useRef } from 'react';

const useUpdateEffect = (effectCallback, dependencies) => {
  const isFirstRender = useRef(true);

  useEffect(
    () => () => {
      isFirstRender.current = true;
    },
    [],
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else if (typeof effectCallback === 'function') {
      return effectCallback();
    }

    return undefined;
  }, dependencies);
};

export default useUpdateEffect;
