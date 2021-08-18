import React, { memo, useContext } from 'react';

import Context from '.';

// The intention of this component is to be used as HoC that maps the context's state as props
// to be able to use memo for having avoiding un-needed renders for components.
const withContextAndMemo = (WrappedComponent, shouldComponentMemoFn = undefined) => {
  const WrappedComponentMemoized = memo(WrappedComponent, shouldComponentMemoFn);
  
  return () => {
    const globalState = useContext(Context);
    return <WrappedComponentMemoized {...globalState} />;
  }
}

export default withContextAndMemo;