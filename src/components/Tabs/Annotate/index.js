import React, { useCallback, useContext, useEffect } from 'react';
import { OPERATIONS } from './Annotate.constants';
import Topbar from '../../Topbar';
import Context from '../../../context';
import * as OperationsComopnents from './Operations';

const Annotate = () => {
  const { canvas, canvasedImage, subTab, updateState } = useContext(Context);

  const emptyingSelections = useCallback((e) => {
    if (e.target === canvasedImage) {
      updateState({
        selections: []
      });
    }
  }, [canvasedImage]);

  useEffect(() => {
    if (canvas) {
      canvas.on('click tap', emptyingSelections);
    }

    return () => {
      if (canvas) {
        canvas.off('click tap', emptyingSelections);
      }
    }
  }, [canvas, emptyingSelections]);

  return (
    <Topbar tabsComponents={OperationsComopnents} tabs={OPERATIONS} tab={subTab} hideTabs={false} />
  )
}

export default Annotate;
