import { useState } from 'react';
import Context from '.';

import defaultState from './defaultState';

const AppProvider = ({ children }) => {
  const [state, setState] = useState(
    () => defaultState
  );

  const updateState = (objectToBeAdded) => setState({
    ...state,
    ...objectToBeAdded
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
