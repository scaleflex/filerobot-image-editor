/** External Dependencies */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@scaleflex/ui/theme/hooks';

/** Internal Dependencies */
import { useAppReducer } from 'hooks';
import appReducer from './appReducer';
import initialAppState from './initialAppState';
import AppContext from './AppContext';

const AppProvider = ({ children, config = {} }) => {
  const [state, dispatch] = useAppReducer(appReducer, initialAppState);
  const theme = useTheme();

  const providedValue = useMemo(
    () => ({
      ...state,
      config,
      theme,
      dispatch,
    }),
    [config, state],
  );

  return (
    <AppContext.Provider value={providedValue}>{children}</AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
