import { useState } from 'react';
import Context from './';

import defaultState from './defaultState';

const AppProvider = ({ children }) => {
  const [state, setState] = useState(
    () => defaultState
  );

  const updateState = (objToBeAddedOrFnReceivesStateReturnsObj) => setState({
    ...state,
    ...(
      typeof objToBeAddedOrFnReceivesStateReturnsObj === 'function'
        ? objToBeAddedOrFnReceivesStateReturnsObj(state)
        : objToBeAddedOrFnReceivesStateReturnsObj
    )
  })

  return (
    <Context.Provider
      value={{
        ...state,
        updateState
      }}
    >
      {children}
    </Context.Provider>
  );
}



export default AppProvider;
