/** External Dependencies */
import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import ThemeProvider from '@scaleflex/ui/theme';

/** Internal Dependencies */
import { AppProvider } from 'context';
import defaultConfig from 'context/defaultConfig';
import deepMerge from 'utils/deepMerge';
import assignFinetuneNamesToKonva from 'utils/assignFinetuneNamesToKonva';
import { FontsFaces, OverrideDefaultStyles } from './globalStyles';

const AssemblyPointProviders = ({ children, ...configProps }) => {
  const { useCloudimage = false, cloudimage = {} } = configProps;

  if (useCloudimage) {
    if (cloudimage?.imageSealing?.enable && !cloudimage?.imageSealing?.salt) {
      throw new Error(
        '`salt` property of imageSealing object is required in cloudimage mode as long as `imageSealing` is enabled.',
      );
    }
  }

  useEffect(() => {
    assignFinetuneNamesToKonva();
  }, []);

  const defaultAndProvidedConfigMerged = deepMerge(defaultConfig, configProps);

  return (
    <ThemeProvider theme={defaultAndProvidedConfigMerged.theme}>
      <FontsFaces />
      <OverrideDefaultStyles />
      <AppProvider config={defaultAndProvidedConfigMerged}>
        {children}
      </AppProvider>
    </ThemeProvider>
  );
};

AssemblyPointProviders.propTypes = {
  useCloudimage: PropTypes.bool,
  cloudimage: PropTypes.instanceOf(Object),
  children: PropTypes.node.isRequired,
};

export default memo(AssemblyPointProviders);
