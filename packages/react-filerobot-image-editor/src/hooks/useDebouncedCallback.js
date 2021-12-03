/** External Dependencies */
import { useCallback } from 'react';

/** Internal Dependencies */
import debounce from 'utils/debounce';

const useDebouncedCallback = (func, timeout, dependencies = []) =>
  useCallback(debounce(func, timeout), dependencies);

export default useDebouncedCallback;
