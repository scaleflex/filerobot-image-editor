/** Internal Dependencies */
import AssemblyPoint from 'components/AssemblyPoint';
import { TABS_IDS, TOOLS_IDS } from 'utils/constants';

import ThemeProvider from '@scaleflex/ui/theme';

/** 'Internal' Dependencies, now made external to access editor Store directly */
import MainCanvas from 'components/MainCanvas';
import App from 'components/App';
import { AppProvider } from 'context';
import defaultConfig from 'context/defaultConfig';
import {
  FontsFaces,
  OverrideDefaultStyles,
} from 'components/AssemblyPoint/globalStyles';

import { useStore } from 'hooks';

export {
  useStore,
  defaultConfig,
  ThemeProvider,
  FontsFaces,
  OverrideDefaultStyles,
  AppProvider,
  App,
  MainCanvas,
  TABS_IDS as TABS,
  TOOLS_IDS as TOOLS,
};

export default AssemblyPoint;
