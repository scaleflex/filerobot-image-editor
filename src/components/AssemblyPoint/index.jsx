/** External Dependencies */
import React, { memo } from 'react';
import ThemeProvider from '@scaleflex/ui/theme';
import { merge } from 'lodash-es';

/** Internal Dependencies */
import App from 'components/App';
import { AppProvider } from 'context';
import defaultConfig from 'context/defaultConfig';
import { FontsFaces, IconsColor } from './globalStyles';

const AssemblyPoint = (props) => {
  const defaultAndProvidedConfigMerged = merge(defaultConfig, props);

  return (
    <React.StrictMode>
      <ThemeProvider>
        <FontsFaces />
        <IconsColor />
        <AppProvider config={defaultAndProvidedConfigMerged}>
          <App />
        </AppProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default memo(AssemblyPoint);
