// TODO: This component would be removed and add its operation to the final step (saving).
import React, { useCallback, useState } from 'react';
import { LinkVertical, WithoutLink } from '@scaleflex/icons';
import { Button, InputGroup } from '@scaleflex/ui/core';

import { AdjustOperationWrapper, ResizeInputsWrapper } from './Operations.styled';

const Resize = () => {
  const [isKeepRatio, setIsKeepRatio] = useState(true);

  const toggleKeepRatio = useCallback(() => {
    setIsKeepRatio((latestIsKeepratio) => !latestIsKeepratio);
  }, []);

  return (
    <AdjustOperationWrapper>
      <ResizeInputsWrapper>
        <InputGroup
          hint="In Pixels (PX)"
          label="Width"
          type="input"
          style={{ width: 85 }}
          inputProps={{ type: 'number' }}
        />
        <Button
          color="secondary"
          icon={isKeepRatio ? <LinkVertical /> : <WithoutLink />}
          size="md"
          onClick={toggleKeepRatio}
          style={{ margin: 4, height: '100%' }}
        />
        <InputGroup
          hint="In Pixels (PX)"
          label="Height"
          type="input"
          style={{ width: 85 }}
          inputProps={{ type: 'number' }}
        />
      </ResizeInputsWrapper>
    </AdjustOperationWrapper>
  );
};

export default Resize;
