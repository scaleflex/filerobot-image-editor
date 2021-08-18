import React, { useCallback, useState } from 'react';
import Context from './';

import defaultState from './defaultState';

const AppProvider = ({ children, value }) => {
  const [state, setState] = useState(
    () => defaultState
  );

  const updateState = useCallback((objToBeAddedOrFnReceivesStateReturnsObj) => {
    setState((latestState) => {
      const stateToBeAdded = typeof objToBeAddedOrFnReceivesStateReturnsObj === 'function'
          ? objToBeAddedOrFnReceivesStateReturnsObj(latestState)
          : objToBeAddedOrFnReceivesStateReturnsObj;

      return stateToBeAdded
        ? ({
          ...latestState,
          ...stateToBeAdded,
        })
        : latestState;
    })
  }, []);

  return (
    <Context.Provider
      value={value || {
        ...state,
        updateState,
      }}
    >
      {children}
    </Context.Provider>
  );
}



export default AppProvider;
