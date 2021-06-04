import React, { useContext } from 'react';

import { StyledTitleBar, TitleBarLeft, TitleBarCenter, TitleBarRight } from './TitleBar.styled';
import GoBackButton from './GoBackButton';
import SaveButton from './SaveButton';
import Context from '../../context';

const TitleBar = () => {
  const { tab } = useContext(Context);

  return (
    <StyledTitleBar>
      <TitleBarLeft>
        <GoBackButton />
      </TitleBarLeft>
      <TitleBarCenter>{tab && `${tab.label} - `}Filerobot Image Editor</TitleBarCenter>
      <TitleBarRight>
        <SaveButton />
      </TitleBarRight>
    </StyledTitleBar>
  )
}

export default TitleBar;
