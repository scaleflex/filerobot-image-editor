/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import AppContext from './AppContext';

// This component is used in repassing the state to react-konva's modules
// As it has issue in context bridging.
const AppProviderOverridenValue = ({ children, overridingValue }) => (
  <AppContext.Provider value={overridingValue}>{children}</AppContext.Provider>
);

AppProviderOverridenValue.propTypes = {
  children: PropTypes.node.isRequired,
  overridingValue: PropTypes.instanceOf(Object).isRequired,
};

export default AppProviderOverridenValue;
