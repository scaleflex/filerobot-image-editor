/** External dependencies */
import styled from 'styled-components';
import { Drawer } from '@scaleflex/ui/core';

const StyledTabsDrawer = styled(Drawer)`
  transition: transform 200ms ease-in-out;
  width: 92px;
  height: 100%;
  padding: 12px;

  .SfxDrawer-list,
  .SfxDrawer-item {
    padding: 0;
  }
`;

export { StyledTabsDrawer };
