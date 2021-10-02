import React, { forwardRef } from 'react';
import { Group } from 'react-konva';

const PreviewGroup = (props, ref) => {
  return <Group ref={ref} {...props} />;
};

export default forwardRef(PreviewGroup);
