/** External dependencies */
import { useMemo } from 'react';

/** Internal dependencies */
import useStore from './useStore';

const useEditableTextId = () => {
  const { textIdOfEditableContent } = useStore();

  return useMemo(() => textIdOfEditableContent, [textIdOfEditableContent]);
};

export default useEditableTextId;
