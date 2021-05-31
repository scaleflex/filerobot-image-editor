import React, { useContext } from 'react';
import AppContext from '../../AppContext';
import Bottombar from '../Bottombar';
import MainCanvas from '../MainCanvas';
import { AVAILABLE_TABS } from '../../utils/constants';
import TitleBar from '../TitleBar';
import Topbar from '../Topbar';
import { StyledWrapper } from './Wrapper.styled';
import * as TabsComponents from '../Tabs';


const Wrapper = ({ imageSrc }) => {
  const { tab } = useContext(AppContext);
  
  return (
    <StyledWrapper>
      <TitleBar />
      <Topbar tabsComponents={TabsComponents} tabs={AVAILABLE_TABS} tab={tab} />
      <MainCanvas imageSrc={imageSrc} />
      <Bottombar />
    </StyledWrapper>
  )
}

export default Wrapper;
