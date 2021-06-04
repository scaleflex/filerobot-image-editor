import React, { useContext } from 'react';
import Context from '../../context';
import Bottombar from '../Bottombar';
import MainCanvas from '../MainCanvas';
import { AVAILABLE_TABS } from '../../utils/constants';
import TitleBar from '../TitleBar';
import Topbar from '../Topbar';
import { StyledWrapper } from './Wrapper.styled';
import * as TabsComponents from '../Tabs';


const Wrapper = ({ image }) => {
  const { tab } = useContext(Context);
  
  return (
    <StyledWrapper>
      <TitleBar />
      <Topbar tabsComponents={TabsComponents} tabs={AVAILABLE_TABS} tab={tab} />
      <MainCanvas image={image} />
      <Bottombar />
    </StyledWrapper>
  )
}

export default Wrapper;
