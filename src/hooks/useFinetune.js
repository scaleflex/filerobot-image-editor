/** External Dependencies */
import { useContext, useEffect, useMemo } from 'react';

/** Internal Dependencies */
import AppContext from 'context';
import { SET_FINETUNE } from 'actions';
import { useDebouncedCallback } from 'hooks';

const CHANGE_DEBOUNCE_MS = 35;

const useFinetune = (finetune, initialProps) => {
  const { dispatch, finetunes, finetunesProps } = useContext(AppContext);

  const setFinetuneWithProps = useDebouncedCallback(
    (newFinetuneProps) => {
      dispatch({
        type: SET_FINETUNE,
        payload: {
          finetune,
          finetuneProps: newFinetuneProps,
        },
      });
    },
    CHANGE_DEBOUNCE_MS,
    [],
  );

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
    () => [
      finetunesProps,
      setFinetuneWithProps,
    ],
    [finetunesProps],
  );
};

export default useFinetune;
