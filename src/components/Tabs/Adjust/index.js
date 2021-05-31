import React, { useContext } from 'react';
import { OPERATIONS } from './Adjust.constants';
import Topbar from '../../Topbar';
import AppContext from '../../../AppContext';
import * as OperationsComopnents from './Operations';

const Adjust = () => {
  const { subTab } = useContext(AppContext);

  return (
    <Topbar tabsComponents={OperationsComopnents} tabs={OPERATIONS} tab={subTab} hideTabs={false} />
  )
}

export default Adjust;
