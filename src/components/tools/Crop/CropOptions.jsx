/** External Dependencies */
import React, { useContext, useEffect } from 'react';

/** Internal Dependencies */
import AppContext from 'context';

const CropOptions = () => {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {}, []);

  return (
    <div>OPTIONS of Cropping!!!!</div>
  );
};

export default CropOptions;
