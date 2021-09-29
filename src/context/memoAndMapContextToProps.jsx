// HOC
/** External Dependencies */
import React, { memo, useContext } from 'react';

/** Internal Dependencies */
import AppContext from './AppContext';

// The intention of this component is to be used as HoC that maps the context's state as props
// to be able to use memo for avoiding un-needed renders for components.
const memoAndMapContextToProps = (WrappedComponent, shouldComponentMemoizedFn = undefined) => {
  const WrappedComponentMemoized = memo(WrappedComponent, shouldComponentMemoizedFn);

  return (wrappedComponentProps) => {
    const globalState = useContext(AppContext);
    // Avoid passing prop with the same key of the state as state value would override that prop.
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <WrappedComponentMemoized {...wrappedComponentProps} {...globalState} />;
  };
};

export default memoAndMapContextToProps;
