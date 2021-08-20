import React, { useContext } from 'react';

import Context from 'context';
import Bottombar from 'components/Bottombar';
import MainCanvas from 'components/MainCanvas';
import { AVAILABLE_TABS, ROOT_CONTAINER_ID } from 'utils/constants';
import TitleBar from 'components/TitleBar';
import Topbar from 'components/Topbar';
import { StyledWrapper } from './Wrapper.styled';
import * as TabsComponents from 'components/Tabs';

const Wrapper = ({ image }) => {
  const { tab } = useContext(Context);

  return (
    <StyledWrapper id={ROOT_CONTAINER_ID}>
      <TitleBar />
      <Topbar tabsComponents={TabsComponents} tabs={AVAILABLE_TABS} tab={tab} />
      <MainCanvas image={image} />
      <Bottombar />
    </StyledWrapper>
  );
};

export default Wrapper;
