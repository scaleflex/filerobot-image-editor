/** External Dependencies */
import { useCallback, useEffect, useMemo, useRef } from 'react';

const useResizeObserver = (onResize = () => {}) => {
  const onResizeCallback = useRef(onResize);
  const resizeObserver = useRef();

  const observerCallback = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.contentRect) {
        const { width, height } = entry.contentRect;

        onResizeCallback.current({
          entry,
          width,
          height,
        });
      }
    });
  }, []);

  const updateOnResizeCallback = useCallback((newOnResizeCallback) => {
    onResizeCallback.current = newOnResizeCallback;
  }, []);

  const initObserver = useCallback(() => {
    if (!resizeObserver.current) {
      resizeObserver.current = new ResizeObserver(observerCallback);
    }
  }, []);

  const observeElement = useCallback((element, newOnResizeCallback) => {
    if (element) {
      if (!resizeObserver.current) {
        initObserver();
      }

      resizeObserver.current.observe(element);

      if (newOnResizeCallback) {
        onResizeCallback.current = newOnResizeCallback;
      }
    }
  }, []);

  const unobserveElement = useCallback((element, newOnResizeCallback) => {
    if (resizeObserver.current && element) {
      resizeObserver.current.unobserve(element);

      if (newOnResizeCallback) {
        onResizeCallback.current = newOnResizeCallback;
      }
    }
  }, []);

  const removeObserver = useCallback(() => {
    if (resizeObserver.current) {
      resizeObserver.current.disconnect();
    }
  }, []);

  useEffect(() => {
    initObserver();
    return removeObserver;
  }, []);

  return useMemo(
    () => [observeElement, unobserveElement, updateOnResizeCallback],
    [],
  );
};

export default useResizeObserver;
