/** External Dependencies */
import { useCallback, useEffect, useMemo } from 'react';

/** Internal Dependencies */
import { SET_FINETUNE } from 'actions';
import useStore from './useStore';

const useFinetune = (finetune, initialProps) => {
  const { dispatch, finetunes, finetunesProps } = useStore();

  const setFinetuneWithProps = useCallback((newFinetuneProps) => {
    dispatch({
      type: SET_FINETUNE,
      payload: {
        finetune,
        finetuneProps: newFinetuneProps,
      },
    });
  }, []);

  useEffect(() => {
    if (!finetunes.includes(finetune)) {
      // initialProps first if we've any similar prop set before w/ diff. val don't override.
      setFinetuneWithProps({
        ...initialProps,
        ...finetunesProps,
      });
    }
  }, []);

  return useMemo(
    () => [finetunesProps, setFinetuneWithProps],
    [finetunesProps],
  );
};

export default useFinetune;
