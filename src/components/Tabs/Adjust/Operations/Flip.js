import React, { useCallback, useContext } from 'react';
import { Button } from '@scaleflex/ui/core';
import { FlipVertically, FlipHorizontally } from '@scaleflex/icons';

import Context from 'context';
import { AdjustOperationWrapper } from './Operations.styled';

const Flip = () => {
  const { canvasedImage } = useContext(Context);

  const applyFlipHorizontally = useCallback(() => {
    if (canvasedImage) {
      canvasedImage.scaleX(-canvasedImage.scaleX());
    }
  }, [canvasedImage]);

  const applyFlipVertically = useCallback(() => {
    if (canvasedImage) {
      canvasedImage.scaleY(-canvasedImage.scaleY());
    }
  }, [canvasedImage]);

  return (
    <AdjustOperationWrapper>
      <Button
        color="secondary"
        icon={<FlipVertically />}
        size="md"
        onClick={applyFlipHorizontally}
      >
        Horizontally
      </Button>
      <Button
        color="secondary"
        icon={<FlipHorizontally />}
        size="md"
        onClick={applyFlipVertically}
      >
        Vertically
      </Button>
    </AdjustOperationWrapper>
  );
};

export default Flip;
