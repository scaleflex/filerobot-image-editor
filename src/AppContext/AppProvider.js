import { useState } from 'react';
import AppContext from '.';

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
    <AppContext.Provider
      value={{
        ...state,
        updateState
      }}
    >
      {children}
    </AppContext.Provider>
  );
}



export default AppProvider;
