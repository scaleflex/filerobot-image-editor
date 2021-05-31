import React from 'react';
import { Spinner } from '@scaleflex/icons';

import { StyledLoading } from './Loading.styled';

const Loading = ({ style }) => (
  <StyledLoading style={style}>
    <Spinner />
  </StyledLoading>
)

export default Loading;
